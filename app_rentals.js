const express = require('express');
const cors = require('cors');
const { connectToDb, getDb } = require('./db_rentals');
const { ObjectId } = require('mongodb');

const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app listening on port 3000');
    });
    db = getDb();
  }
});

app.get('/bikes', (req, res) => {
  let bikes = []; // Declare bikes array
  db.collection('bikes')
    .find()
    .forEach(bike => bikes.push(bike))
    .then(() => {
      res.status(200).json(bikes);
    })
    .catch((err) => {
      console.error('Error fetching bikes:', err); // Log the error
      res.status(500).json({ error: 'Could not fetch bikes' });
    });
});

app.get('/bikes/:id', (req, res) => {
  db.collection('bikes')
    .findOne({ _id: new ObjectId(req.params.id) })
    .then(doc => {
      if (doc && doc.quantity !== undefined) {
        const quantity = doc.quantity;
        res.status(200).send(String(quantity));
      } else {
        res.status(404).json({ error: 'Bike not found or quantity not defined' });
      }
    })
    .catch((err) => {
      console.error('Error fetching the doc:', err);
      res.status(500).json({ error: 'Could not fetch the doc' });
    });
});

app.post('/bikes/:id/subtractQuantity', (req, res) => {
  const bikeId = req.params.id;
  const quantityToSubtract = parseInt(req.body.quantity);

  if (isNaN(quantityToSubtract) || quantityToSubtract <= 0) {
    return res.status(400).json({ error: 'Invalid quantity value' });
  }

  db.collection('bikes')
    .findOne({ _id: new ObjectId(bikeId) })
    .then((bike) => {
      if (!bike || bike.quantity === undefined) {
        return res.status(404).json({ error: 'Bike not found or quantity not defined' });
      }

      const availableQuantity = bike.quantity;

      if (quantityToSubtract > availableQuantity) {
        // If the user tries to subtract more bikes than available, display an alert.
        return res.status(400).json({ error: 'Bikes not available' });
      }

      // Proceed with the subtraction
      db.collection('bikes')
        .findOneAndUpdate(
          { _id: new ObjectId(bikeId) },
          { $inc: { quantity: -quantityToSubtract } },
          { returnDocument: 'after' } // Return the updated document
        )
        .then((updatedBike) => {
          if (updatedBike.value) {
            const updatedQuantity = updatedBike.value.quantity;

            if (updatedQuantity >= 0) {
              const remainingQuantity = updatedQuantity;
              res.status(200).json({ success: true, updatedQuantity: remainingQuantity });
            } else {
              // If the quantity becomes negative after the update, it's invalid
              res.status(400).json({ error: 'Invalid quantity value' });
            }
          } else {
            res.status(404).json({ error: 'Bike not found' });
          }
        })
        .catch((err) => {
          console.error('Error updating quantity:', err);
          res.status(500).json({ error: 'Could not update quantity' });
        });
    })
    .catch((err) => {
      console.error('Error fetching bike:', err);
      res.status(500).json({ error: 'Could not fetch bike' });
    });
});
