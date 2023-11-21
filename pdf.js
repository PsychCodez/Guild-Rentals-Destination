const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = 9000;

app.get('/generate-pdf', (req, res) => {
    // Create a PDF document
    const doc = new PDFDocument();
    const filePath = 'pickup_details.pdf';

    // Pipe the PDF to a file
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    // Add content to the PDF (replace this with your pickup details)
    doc.text('Pick-Up Details:', 100, 100);
    doc.text('Location: Your Pickup Location', 100, 120);
    doc.text('Date: Your Pickup Date', 100, 140);

    // Finalize the PDF and close the stream
    doc.end();
    stream.on('finish', () => {
        res.download(filePath, 'pickup_details.pdf', (err) => {
            if (err) {
                console.error('Error downloading PDF:', err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log('PDF downloaded successfully');
                // Optionally, you may want to delete the PDF file after it's downloaded
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting PDF:', err);
                    } else {
                        console.log('PDF file deleted');
                    }
                });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
