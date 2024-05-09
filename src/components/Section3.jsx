import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import SignatureCanvas from 'react-signature-canvas';
import {
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import TextField from './FormsUI/Text';
import DateTimePicker from './FormsUI/Text/DataTimePicker';
import CheckBox from './FormsUI/Checkbox';
import Submit from './FormsUI/Button';
import { useFormData }  from '../context/FormDataContext'; // Import useFormData hook

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  signatureContainer: {
    border: "2px solid black",
    width: 420,
    height: 60,
  },
}));

const INITIAL_FORM_STATE = {
  s3_firstname: '',
  s3_lastname: '',
  s3_myselfcheck: false,
  s3_childrencheck: false,
  s3_adultcheck: false,
  s3_dob: '',
  s3_hometeleno: '',
  s3_workteleno: ''
};

const FORM_VALIDATION = Yup.object().shape({
  s3_firstname: Yup.string().required('Required'),
  s3_lastname: Yup.string().required('Required'),
  s3_myselfcheck: Yup.boolean(),
  s3_childrencheck: Yup.boolean(),
  s3_adultcheck: Yup.boolean(),
  s3_dob: Yup.date().required('Required'),
  s3_hometeleno: Yup.number().integer().typeError('Please enter a home telephone number').required('Required'),
  s3_workteleno: Yup.number().integer().typeError('Please enter a work telephone number').required('Required'),
});

function Section3() {
  const [sign, setSign] = React.useState(null);
  const { updateFormData } = useFormData(); 
  const [signatureImage, setSignatureImage] = useState(null); // State to store the generated image


  const handleClear = () => {
    if (sign) {
      sign.clear();
    }
  };

  const handleGenerate = () => {
    if (sign) {
      // Convert canvas content to image file
      const imageData = sign.toDataURL('image/png');
      
      // Create a Blob from the data URL
      const blob = dataURLtoBlob(imageData);
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'signature.png'; // Specify the filename
      
      // Trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const classes = useStyles();

  return (
    <Formik
      initialValues={INITIAL_FORM_STATE}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values) => {
        updateFormData(values); // Update form data
        console.log(values);
      }}
    >
      <Form>
        <Grid container spacing={2} className='section-three' style={{ width: '95%' }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Section 3 – Signature</Typography>
            <hr />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '10px 10px 6px 20px' }}>Concent</Typography>
            <Typography variant="subtitle2" style={{ padding: '20px 10px 6px 20px' }}>I have read and agree to the Patient Commitment, the Consent to Release Personal Health Information and the Cancellation Conditions on the back of this form. I acknowledge that this Enrolment is not intended to be a legally binding contract and is not intended to give rise to any new legal obligations between my family doctor and me.</Typography>
          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>I am signing on behalf of (check all that apply)</Typography>
                    <div style={{ display: 'flex' }}>
                      <CheckBox name='s3_myselfcheck' label='Myself' />
                      <CheckBox name='s3_childrencheck' label='Child(ren)' />
                      <CheckBox name='s3_adultcheck' label='Dependent adult(s)' />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name="s3_firstname"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name="s3_lastname"
                      label="Last Name"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Signature</Typography>
                    <div className={classes.signatureContainer}>
                      <SignatureCanvas
                        canvasProps={{ width: 420, height: 60 }}
                        ref={(ref) => setSign(ref)}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <DateTimePicker
                      name="s3_dob"
                      label="Date"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      name="s3_hometeleno"
                      label="Home Telephone No"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="s3_workteleno"
                      label="Work Telephone No"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={handleGenerate}>Save</button>
                  </Grid>
                  <Submit>Save</Submit>
                </Grid>
              </div>
            </Container>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default Section3;
