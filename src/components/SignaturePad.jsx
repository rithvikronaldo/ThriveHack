import React from 'react';
import { Grid } from '@material-ui/core';
import SignatureCanvas from 'react-signature-canvas';

function SignaturePad({ handleClear, handleGenerate }) { // Receive handleClear and handleGenerate as props
  const [sign, setSign] = useState(null);
  const [url, setUrl] = useState('');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ border: "2px solid black", width: 80, height: 100 }}>
          <SignatureCanvas
            canvasProps={{ width: 80, height: 100, className: 'sigCanvas' }}
            ref={data => setSign(data)}
          />
        </div>
      </Grid>
      <Grid item xs={12}>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleGenerate}>Save</button>
      </Grid>
      <Grid item xs={12}>
        <br />
        <br />
        {url && <img src={url} alt="signature" />}
      </Grid>
    </Grid>
  );
}

export default SignaturePad;
