import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Box, Typography, IconButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SmsIcon from '@mui/icons-material/Sms';
import { styled } from '@mui/material/styles';
import { ReactComponent as Logo } from '../assets/MahoorLogoType.svg';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '48px',
  '& .MuiInputBase-input': {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    padding: '8px',
  },
}));

function mapStateToProps(state) {
  return {};
}

class SMSVerifyComponent extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.triggerVerComponent = this.triggerVerComponent.bind(this);
  }

  state = {
    inputs: ['', '', '', '', '', ''],
    loading: false,
    error: null,
    snackbarOpen: false,
    snackbarMessage: '',
    snackbarSeverity: 'success',
  };

  initVerify = () => {
    const { email } = this.props;
    if (!email) {
      this.setState({
        error: 'ایمیل مورد نیاز است',
        snackbarOpen: true,
        snackbarMessage: 'ایمیل مورد نیاز است',
        snackbarSeverity: 'error',
      });
      return;
    }

    this.setState({ loading: true, error: null });

    console.log(`Sending request with email: ${email}`); // Debug log

    fetch('http://127.0.0.1:8000/digitalAssets/generatekeyCode/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }), // Ensure JSON body
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        this.setState({ loading: false });
        if (data.status === 'success') {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: 'کد تائید ارسال شد',
            snackbarSeverity: 'success',
          });
        } else {
          this.setState({
            error: data.message || 'خطا در ارسال کد تائید',
            snackbarOpen: true,
            snackbarMessage: data.message || 'خطا در ارسال کد تائید',
            snackbarSeverity: 'error',
          });
        }
      })
      .catch(error => {
        console.error('Error sending verification code:', error);
        this.setState({
          loading: false,
          error: 'خطا در ارتباط با سرور',
          snackbarOpen: true,
          snackbarMessage: 'خطا در ارتباط با سرور',
          snackbarSeverity: 'error',
        });
      });
  };

  componentDidMount() {
    if (!this.state.loading) {
      this.initVerify();
    }
    document.getElementById('input0')?.focus();
    document.addEventListener('mousedown', this.triggerVerComponent);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.triggerVerComponent);
  }

  triggerVerComponent = event => {
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.props.closeVerifectionCode();
    }
  };

  handleInputChange = (event, inputIndex) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    if (inputValue.length > 1) return;

    this.setState(
      prevState => {
        const inputs = [...prevState.inputs];
        inputs[inputIndex] = inputValue;
        return { inputs };
      },
      () => {
        if (inputValue && inputIndex < 5) {
          document.getElementById(`input${inputIndex + 1}`)?.focus();
        } else if (!inputValue && inputIndex > 0) {
          document.getElementById(`input${inputIndex - 1}`)?.focus();
        } else if (inputIndex === 5 && inputValue) {
          const code = this.state.inputs.join('');
          this.props.setVerCodeAndSubmit(code);
        }
      }
    );
  };

  render() {
    const { inputs, loading, error, snackbarOpen, snackbarMessage, snackbarSeverity } = this.state;

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1300,
        }}
      >
        <Box
          ref={this.wrapperRef}
          sx={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            width: { xs: '90%', sm: '400px' },
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            position: 'relative',
            direction: 'rtl',
            textAlign: 'right',
          }}
        >
          <IconButton
            onClick={this.props.closeVerifectionCode}
            sx={{ position: 'absolute', top: '8px', left: '8px' }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Logo style={{ width: '40px', height: '40px', marginLeft: '8px' }} />
            <Typography variant="h6" sx={{ color: '#333' }}>
              انجمن علمی مهندسی کامپیوتر
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <SmsIcon sx={{ color: '#d32f2f', mr: 1 }} />
            <Typography variant="body1" sx={{ color: '#555' }}>
              کد تائید تا دقایقی دیگر برای شما ارسال می‌شود. کد را وارد کنید.
            </Typography>
          </Box>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          {loading && <CircularProgress size={24} sx={{ mb: 2 }} />}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            {inputs.map((value, index) => (
              <StyledTextField
                key={index}
                id={`input${index}`}
                value={value}
                onChange={e => this.handleInputChange(e, index)}
                inputProps={{ maxLength: 1 }}
                variant="outlined"
                autoFocus={index === 0}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={this.initVerify}
            disabled={loading}
            sx={{ width: '100%' }}
          >
            ارسال مجدد کد
          </Button>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => this.setState({ snackbarOpen: false })}
          >
            <Alert severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    );
  }
}

export default connect(mapStateToProps)(SMSVerifyComponent);