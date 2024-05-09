import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { PDFDocument } from 'pdf-lib';
import OriginalPdf from '../pdfs/Original.pdf';
import { useFormData } from '../context/FormDataContext'; // Import useFormData hook
import Signature from '../images/signature.png'

const Footer = () => {
  const { formData } = useFormData(); // Access formData from the context

  const modifyPDF = async () => {
    try {
      // Load the existing PDF
      const existingPdfBytes = await fetch(OriginalPdf).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const truncatedDob1 = formData.s1_dob.replace(/-/g, '').substring(0, 8);
      const truncatedDob2 = formData.s2_dob.replace(/-/g, '').substring(0, 8);
      const truncatedDob3 = formData.s3_dob.replace(/-/g, '').substring(0, 8);





      // Access the form
      const form = pdfDoc.getForm();

      // Modify form fields as needed
      form.getTextField('First Name of adult submitting form').setText(formData.s1_firstname);
      form.getTextField('Last name of adult submitting form').setText(formData.s1_lastname);
      form.getTextField('Second Name of adult patient').setText(formData.s1_middlename);
      form.getTextField('Email Address of adult submitting form').setText(formData.s1_email);
      form.getTextField('Health Number').setText(formData.s1_healthnum);
      form.getTextField('Date of Birth 1').setText(truncatedDob1);
      form.getTextField('Street (Mailing address)').setText(formData.s1_addressline1);
      form.getTextField('CityTown (Mailing address)').setText(formData.s1_city1);
      form.getTextField('Postal Code (Mailing address)').setText(formData.s1_postalcode1);
      form.getTextField('Street (Residential address)').setText(formData.s1_addressline2);
      form.getTextField('CityTown (Residential address)').setText(formData.s1_city2);
      form.getTextField('Postal code (Residential address)').setText(formData.s1_postalcode2);
      
    if (formData.s1_mailingadd) {
        form.getCheckBox('Different residential address').check();
    } else {
        form.getCheckBox('Different residential address').uncheck();
    }
      form.getRadioGroup('Notices').select(formData.s1_regularmail ? 'email' : 'Regular Mail');

      form.getTextField('Last Name A').setText(formData.s2_lastname);
      form.getTextField('First Name_A').setText(formData.s2_firstname);
      form.getTextField('Second Name_A').setText(formData.s2_middlename);
      form.getTextField('Street_Residence_A').setText(formData.s2_firstname);
      form.getTextField('Health Number_A').setText(formData.s2_healthnum);
      form.getTextField('Date of Birth yyyymmdd_2').setText(truncatedDob2);
      form.getTextField('Street Mailing A').setText(formData.s2_addressline1);
      form.getTextField('CityTown_Mailing_A').setText(formData.s2_city1);
      form.getTextField('Postal Code_A').setText(formData.s2_postalcode1);
      form.getTextField('Street_Residence_A').setText(formData.s1_addressline2);
      form.getTextField('CityTown_Residence_A').setText(formData.s2_city2);
      form.getTextField('Postal Code_Residence_A').setText(formData.s2_postalcode2);
      console.log("Signature Data URL:", formData.signatureData);

      // Set Relationship A radio group based on form data



      form.getTextField('Full name').setText(formData.s3_firstname);
      form.getTextField('Date signed').setText(formData.s3_dob);
      form.getTextField('Home or Mobile Telephone No').setText(formData.s3_hometeleno);
      form.getTextField('Work Telephone No').setText(formData.s3_workteleno);

      form.getTextField('Family Doctor Information').setText(formData.s4_firstname);


      if (formData.s3_myselfcheck) {
        form.getCheckBox('myself').check();
    } else {
        form.getCheckBox('myself').uncheck();
    }

    if (formData.s3_childrencheck) {
      form.getCheckBox('children').check();
  } else {
      form.getCheckBox('children').uncheck();
  }

  if (formData.s3_adultcheck) {
    form.getCheckBox('dependent adults').check();
} else {
    form.getCheckBox('dependent adults').uncheck();
}

form.getTextField('Family Doctor Information').setText(formData.s4_notes);



const signatureImageBytes = await fetch(Signature).then(res => res.arrayBuffer());
const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
const page = pdfDoc.getPages()[0]; // Assuming you want to add the signature to the first page
page.drawImage(signatureImage, {
  x: 20,
  y: 75,
  width: 200, // Adjust width as needed
  height: 20, // Adjust height as needed
});










      
      form.flatten();



      
      const modifiedPdfBytes = await pdfDoc.save();

      // Perform further actions, like downloading or displaying the modified PDF
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error modifying PDF:', error);
    }
  };

  return (
    <Grid
      container
      justify="flex-end"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#ffffff', // Adjust background color as needed
        padding: '20px',
        borderTop: '1px solid #ccc',
        zIndex: 1000, // Set a higher z-index value
      }}
      className="footer"
    >
      <Button variant="contained" color="secondary" onClick={modifyPDF}>
        Generate PDF
      </Button>
    </Grid>
  );
};

export default Footer;
