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
import Submit from './FormsUI/Button';
import { useFormData } from '../context/FormDataContext'; // Import useFormData hook

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
  s4_notes: '',
  s4_date: ''
};

const FORM_VALIDATION = Yup.object().shape({
  s4_notes: Yup.string().required('Required'),
  s4_date: Yup.date().required('Required'),
});

function Section4() {
  const [sign, setSign] = useState(null);
  const { updateFormData } = useFormData(); // Use the useFormData hook

  const handleClear = () => {
    if (sign) {
      sign.clear();
    }
  };

  const handleGenerate = () => {
    if (sign) {
      const signatureData = sign.getTrimmedCanvas().toDataURL('image/png');
      console.log(signatureData);
    }
  };

  const classes = useStyles();

  return (
    <Grid container spacing={2} className='section-four' style={{ width: '95%' }}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" style={{ fontWeight: 'bold', padding: '6px 10px' }}>Section 4 – Family doctor information</Typography>
        <hr />
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="md">
          <div className={classes.formWrapper}>
            <Formik
              initialValues={{
                ...INITIAL_FORM_STATE
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                updateFormData(values); // Update form data
                console.log(values);
              }}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="s4_notes"
                      label="Message"
                      multiline={true}
                      rows={4}
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
                  <Grid item xs={3} style={{ paddingTop: '35px' }}>
                    <DateTimePicker
                      name="s4_date"
                      label="Date"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={handleGenerate}>Save</button>
                  </Grid>
                  <Submit>
                    Save
                  </Submit>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

export default Section4;
