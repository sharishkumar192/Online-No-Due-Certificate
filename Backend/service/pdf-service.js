const PDFDocument = require('pdfkit');

function buildPDF(data,dataCallback, endCallback) {
    console.log(data)
  const doc = new PDFDocument({ margin:50,bufferPages: true, font: 'Courier' });

  doc.on('data', dataCallback);
  doc.on('end', endCallback);
    generateHeader(doc)
 // doc.fontSize(25).text(`National Institute Of Technology, Calicut`);
//   doc.fontSize(20).text('');
    doc.fontSize(20).text(' ');
    doc.fontSize(20).text(' ');


  doc
    .fontSize(12)
    .text(
      `This is to certify that to ${data.username} has no dues in any of the department.The original degree can be issued .`
    );
  doc.end();
}

function generateHeader(doc) {
	doc.image('service/nitc_logo.png', 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('NIT Calicut', 110, 57)
		.fontSize(10)
		.text('National Institute Of Technolgy,Calicut', 200, 65, { align: 'right' })
		.text('Kerala,India', 200, 80, { align: 'right' })
		.moveDown();
}
module.exports = { buildPDF };