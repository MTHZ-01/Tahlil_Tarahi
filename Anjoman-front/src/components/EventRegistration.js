import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography, Chip } from '@mui/material';
import { CSSTransition } from 'react-transition-group';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';
import { Cookies } from 'react-cookie';

class EventRegistration extends Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        this.state = {
            uid: '',
            loading: false,
            error: null,
            success: null,
            showForm: false,
        };
    }

    loadUserId = () => {
        const token = this.cookies.get('sessionId') || '';
        this.setState({ loading: true, error: null, success: null });
        fetch(`https://alucarddev.ir/digitalAssets/get_current_user`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ loading: false });
                if (data.status === 'ok') {
                    this.setState({ uid: data.userId.toString() });
                } else {
                    this.setState({ error: data.message || 'لطفا ابتدا وارد شوید' });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ loading: false, error: 'خطا در ارتباط با سرور' });
            });
    };

    registerForEvent = (e) => {
        e.preventDefault();
        const { uid } = this.state;
        const { eventId } = this.props;

        if (!uid) {
            this.setState({ error: 'شناسه کاربری موجود نیست' });
            return;
        }

        this.setState({ loading: true, error: null, success: null });

        const token = this.cookies.get('sessionId') || '';
        fetch(`https://alucarddev.ir/digitalAssets/events/${eventId}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ uid }),
        })
            .then((response) => response.json())
            .then((data) => {
                this.setState({ loading: false });
                if (data.status === 'ok') {
                    this.setState({ success: 'با موفقیت ثبت‌نام شدید!', uid: '' });
                    setTimeout(() => {
                        this.props.history.push('/events');
                    }, 2000);
                } else {
                    this.setState({ error: data.message || 'خطایی رخ داد' });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                this.setState({ loading: false, error: 'خطا در ارتباط با سرور' });
            });
    };

    toggleForm = () => {
        this.setState((prevState) => ({ showForm: !prevState.showForm }), () => {
            if (this.state.showForm) {
                this.loadUserId();
            }
        });
    };

    render() {
        const { navBarSmallView, data } = this.props;
        const { uid, loading, error, success, showForm } = this.state;
        const isFull = data.registrationCount >= data.max_signUps;

        // Mobile View
        if (navBarSmallView) {
            return (
                <div className="event-registration-mobile p-3 border">
                    <Chip
                        icon={<PeopleIcon />}
                        label={`${data.registrationCount} / ${data.max_signUps} نفر ثبت‌نام کرده‌اند`}
                        sx={{
                            bgcolor: isFull ? '#d32f2f' : '#ff9800',
                            color: '#fff',
                            fontFamily: '"Roboto", sans-serif',
                            fontWeight: 'medium',
                            borderRadius: '16px',
                            padding: '4px 8px',
                            mb: 2,
                            '& .MuiChip-icon': { color: '#fff' }
                        }}
                    />
                    <CSSTransition
                        in={!showForm}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div className="center">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.toggleForm}
                                className="register-btn"
                                disabled={isFull}
                            >
                                {isFull ? 'ظرفیت تکمیل شده' : 'ثبت‌نام در رویداد'}
                            </Button>
                        </div>
                    </CSSTransition>

                    <CSSTransition
                        in={showForm}
                        timeout={300}
                        classNames="fade"
                        unmountOnExit
                    >
                        <form onSubmit={this.registerForEvent} className="center flex-column p-2">
                            <Button
                                className="back-btn"
                                onClick={this.toggleForm}
                                startIcon={<ArrowBackIcon />}
                            >
                                بازگشت
                            </Button>
                            <Typography variant="h6" className="mb-3">
                                ثبت‌نام در رویداد
                            </Typography>
                            <Typography variant="body1" className="mb-3">
                                شناسه کاربری: {uid || (loading ? 'در حال بارگیری...' : 'نامشخص')}
                            </Typography>
                            {error && (
                                <Typography color="error" className="mb-2">
                                    {error}
                                </Typography>
                            )}
                            {success && (
                                <Typography color="primary" className="mb-2">
                                    {success}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading || !uid || isFull}
                                className="mt-2"
                            >
                                {loading ? <CircularProgress size={24} /> : 'ثبت‌نام'}
                            </Button>
                        </form>
                    </CSSTransition>
                </div>
            );
        }

        // Desktop View
        return (
            <div className="event-registration-desktop border bg-light p-4">
                <Chip
                    icon={<PeopleIcon />}
                    label={`${data.registrationCount} / ${data.max_signUps} نفر ثبت‌نام کرده‌اند`}
                    sx={{
                        bgcolor: isFull ? '#d32f2f' : '#ff9800',
                        color: '#fff',
                        fontFamily: '"Roboto", sans-serif',
                        fontWeight: 'medium',
                        borderRadius: '16px',
                        padding: '4px 8px',
                        mb: 2,
                        '& .MuiChip-icon': { color: '#fff' }
                    }}
                />
                <CSSTransition
                    in={!showForm}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div className="center">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.toggleForm}
                            className="register-btn"
                            disabled={isFull}
                        >
                            {isFull ? 'ظرفیت تکمیل شده' : 'ثبت‌نام در رویداد'}
                        </Button>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={showForm}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <form onSubmit={this.registerForEvent} className="center flex-column">
                        <Typography variant="h5" className="mb-3">
                            ثبت‌نام در رویداد
                        </Typography>
                        <Typography variant="body1" className="mb-3">
                            شناسه کاربری: {uid || (loading ? 'در حال بارگیری...' : 'نامشخص')}
                        </Typography>
                        {error && (
                            <Typography color="error" className="mb-2">
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography color="primary" className="mb-2">
                                {success}
                            </Typography>
                        )}
                        <div className="d-flex justify-content-between w-100">
                            <Button
                                variant="outlined"
                                onClick={this.toggleForm}
                                startIcon={<ArrowBackIcon />}
                            >
                                بازگشت
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading || !uid || isFull}
                            >
                                {loading ? <CircularProgress size={24} /> : 'ثبت‌نام'}
                            </Button>
                        </div>
                    </form>
                </CSSTransition>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    navBarSmallView: state.navBarSmallView,
});

export default withRouter(connect(mapStateToProps)(EventRegistration));