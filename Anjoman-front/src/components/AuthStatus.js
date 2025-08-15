import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Typography, Box, Avatar, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ArticleIcon from '@mui/icons-material/Article';
import LinearProgress from '@mui/material/LinearProgress';
import { Cookies } from 'react-cookie';
import { Fragment } from 'react';
import ActiveOrds from './ActiveOrds';
import ArticleSubmission from './ArticleSubmission.jsx';
import { setLuxAlert, setAuthStatusOpen, setAuthStatusData, setLogInStatus } from '../redux/actions';


function mapStateToProps(state) {
    return {
        authData: state.authData,
        navBarSmallView: state.navBarSmallView
    };
}

const dispatchToProps = {
    setAuthStatusOpen,
    setAuthStatusData,
    setLogInStatus,
    setLuxAlert
};

class AuthStatus extends Component {
    c = new Cookies();

    state = {
        authData: null,
        registrations: [],
        loadingRegistrations: false,
        loadingUserInfo: false,
        loadingUpdate: false,
        registrationError: null,
        userInfoError: null,
        updateError: null,
        updateSuccess: null,
        editMode: false,
        showArticleSubmission: false,
        formData: {
            firstName: '',
            lastName: '',
            email: '',
            bio: '',
            password: '',
            profile_photo: null,
            resume: null
        }
    };

    showSuccessAlert = (message, subMessage, severity = "success") => {
        this.props.setLuxAlert({ open: true, title: message, content: subMessage, severity: severity });
        setTimeout(() => this.props.setLuxAlert({ open: false }), 5000);
    };

    handleLogOut = () => {
        fetch("https://alucarddev.ir/digitalAssets/LogOut", {
            method: "POST",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(() => {
                this.props.setLogInStatus(false);
                this.props.setAuthStatusOpen(false);
                this.c.remove("sessionId");
                this.showSuccessAlert("موفق!", "شما خارج شدید");
            })
            .catch(error => {
                console.error("Error logging out:", error);
                this.showSuccessAlert("خطا!", "خطا در خروج از سیستم", "error");
            });
    };

    fetchRegistrations = () => {
        const token = this.c.get("sessionId");
        if (token) {
            this.setState({ loadingRegistrations: true, registrationError: null });
            fetch("https://alucarddev.ir/digitalAssets/my_registrations", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log("Registrations response:", data);
                    this.setState({ loadingRegistrations: false });
                    if (data.status === "no") {
                        this.setState({ registrationError: data.message });
                        this.showSuccessAlert("خطا!", data.message, "error");
                    } else {
                        this.setState({ registrations: data.data || [] });
                    }
                })
                .catch(error => {
                    console.error("Error fetching registrations:", error);
                    this.setState({ loadingRegistrations: false, registrationError: "خطا در ارتباط با سرور" });
                    this.showSuccessAlert("خطا!", "خطا در ارتباط با سرور", "error");
                });
        } else {
            this.c.remove("sessionId");
            this.setState({ loadingRegistrations: false, registrationError: "لطفا ابتدا وارد شوید" });
            this.showSuccessAlert("خطا!", "لطفا ابتدا وارد شوید", "error");
        }
    };

    fetchUserInfo = () => {
        const token = this.c.get("sessionId");
        if (token) {
            this.setState({ loadingUserInfo: true, userInfoError: null });
            fetch("https://alucarddev.ir/digitalAssets/getAllUserInfo", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    console.log("User info response:", data);
                    this.setState({ loadingUserInfo: false });
                    if (data.status === "no") {
                        this.setState({ userInfoError: data.message });
                        this.showSuccessAlert("خطا!", data.message, "error");
                    } else {
                        const authData = { ...data, ords: data.ords || [] };
                        this.props.setAuthStatusData(authData);
                        this.setState({ 
                            authData,
                            formData: {
                                firstName: authData.firstName || '',
                                lastName: authData.lastName || '',
                                email: authData.email || '',
                                bio: authData.bio || '',
                                password: '',
                                profile_photo: null,
                                resume: null
                            }
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching user info:", error);
                    this.setState({ loadingUserInfo: false, userInfoError: "خطا در ارتباط با سرور" });
                    this.showSuccessAlert("خطا!", "خطا در ارتباط با سرور", "error");
                });
        } else {
            this.c.remove("sessionId");
            this.setState({ loadingUserInfo: false, userInfoError: "لطفا ابتدا وارد شوید" });
            this.showSuccessAlert("خطا!", "لطفا ابتدا وارد شوید", "error");
        }
    };

    cancelRegistration = (registrationId) => {
        if (window.confirm("آیا مطمئن هستید که می‌خواهید این ثبت‌نام را لغو کنید؟")) {
            const token = this.c.get("sessionId");
            if (token) {
                fetch(`https://alucarddev.ir/digitalAssets/cancel_registration/${registrationId}`, {
                    method: "DELETE",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    credentials: 'include'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log("Cancel registration response:", data);
                        if (data.status === "ok") {
                            this.setState(prevState => ({
                                registrations: prevState.registrations.filter(r => r.id !== registrationId)
                            }));
                            this.showSuccessAlert("موفق!", data.message || "ثبت‌نام با موفقیت لغو شد");
                        } else {
                            this.showSuccessAlert("خطا!", data.message || "خطا در لغو ثبت‌نام", "error");
                        }
                    })
                    .catch(error => {
                        console.error("Error cancelling registration:", error);
                        this.showSuccessAlert("خطا!", "خطا در ارتباط با سرور", "error");
                    });
            } else {
                this.c.remove("sessionId");
                this.showSuccessAlert("خطا!", "توکن معتبر نیست", "error");
            }
        }
    };

    toggleEditMode = () => {
        this.setState(prevState => ({
            editMode: !prevState.editMode,
            updateError: null,
            updateSuccess: null,
            showArticleSubmission: false
        }));
    };

    toggleArticleSubmission = () => {
        this.setState(prevState => ({
            showArticleSubmission: !prevState.showArticleSubmission,
            editMode: false,
            updateError: null,
            updateSuccess: null
        }));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [name]: value }
        }));
    };

    handleFileChange = (e) => {
        const { name, files } = e.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [name]: files[0] }
        }));
    };

    updateProfile = (e) => {
        e.preventDefault();
        const token = this.c.get("sessionId");
        if (!token) {
            this.c.remove("sessionId");
            this.setState({ updateError: "لطفا ابتدا وارد شوید" });
            this.showSuccessAlert("خطا!", "لطفا ابتدا وارد شوید", "error");
            return;
        }

        this.setState({ loadingUpdate: true, updateError: null, updateSuccess: null });
        const formData = new FormData();
        for (const [key, value] of Object.entries(this.state.formData)) {
            if (value !== null && value !== '') {
                formData.append(key, value);
            }
        }

        fetch("https://alucarddev.ir/digitalAssets/update_profile", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ loadingUpdate: false });
                if (data.status === "ok") {
                    this.setState({ 
                        authData: data.data,
                        updateSuccess: "پروفایل با موفقیت به‌روزرسانی شد",
                        editMode: false
                    });
                    this.props.setAuthStatusData(data.data);
                    this.showSuccessAlert("موفق!", "پروفایل با موفقیت به‌روزرسانی شد");
                } else {
                    this.setState({ updateError: data.message || "خطا در به‌روزرسانی پروفایل" });
                    this.showSuccessAlert("خطا!", data.message || "خطا در به‌روزرسانی پروفایل", "error");
                }
            })
            .catch(error => {
                console.error("Error updating profile:", error);
                this.setState({ 
                    loadingUpdate: false, 
                    updateError: "خطا در ارتباط با سرور"
                });
                this.showSuccessAlert("خطا!", "خطا در ارتباط با سرور", "error");
            });
    };

    componentDidMount() {
        const token = this.c.get("sessionId");
        if (token) {
            this.fetchUserInfo();
            this.fetchRegistrations();
        } else {
            this.c.remove("sessionId");
            this.setState({ loadingUserInfo: false, loadingRegistrations: false });
            this.showSuccessAlert("خطا!", "لطفا ابتدا وارد شوید", "error");
        }
    }

    render() {
        const { authData, registrations, loadingRegistrations, loadingUserInfo, loadingUpdate, registrationError, userInfoError, updateError, updateSuccess, editMode, showArticleSubmission, formData } = this.state;

        return (
            <Box className="auth-status-cont">
                <IconButton className="close-button" onClick={() => this.props.setAuthStatusOpen(false)}>
                    <CloseIcon />
                </IconButton>
                {(loadingUserInfo || loadingRegistrations || loadingUpdate) && (
                    <Box className="progress-bar">
                        <LinearProgress />
                    </Box>
                )}
                {authData && !loadingUserInfo && !loadingRegistrations && (
                    <Fragment>
                        <Box className="profile-container">
                            <Box className="header">
                                <Typography variant="h5">
                                    خوش آمدید <strong>{authData.firstName || 'کاربر'}</strong> عزیز
                                    <IconButton className="edit-button" onClick={this.toggleEditMode}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton className="article-button" onClick={this.toggleArticleSubmission}>
                                        <ArticleIcon />
                                    </IconButton>
                                </Typography>
                            </Box>
                            {showArticleSubmission && (
                                <ArticleSubmission 
                                    onClose={this.toggleArticleSubmission} 
                                    showSuccessAlert={this.showSuccessAlert}
                                />
                            )}
                            {!editMode && !showArticleSubmission && (
                                <Box className="profile-details">
                                    {authData.profile_photo ? (
                                        <Avatar src={authData.profile_photo} className="avatar" />
                                    ) : (
                                        <Avatar className="avatar">
                                            {authData.firstName?.[0] || 'U'}
                                        </Avatar>
                                    )}
                                    <Typography className="profile-text">
                                        نام کاربری: <strong>{authData.username}</strong>
                                    </Typography>
                                    {authData.email && (
                                        <Typography className="profile-text">
                                            ایمیل: <strong>{authData.email}</strong>
                                        </Typography>
                                    )}
                                    {authData.firstName && (
                                        <Typography className="profile-text">
                                            نام: <strong>{authData.firstName}</strong>
                                        </Typography>
                                    )}
                                    {authData.lastName && (
                                        <Typography className="profile-text">
                                            نام خانوادگی: <strong>{authData.lastName}</strong>
                                        </Typography>
                                    )}
                                    {authData.bio && (
                                        <Typography className="profile-text">
                                            بیوگرافی: <strong>{authData.bio}</strong>
                                        </Typography>
                                    )}
                                    {authData.resume && (
                                        <Typography className="profile-text">
                                            رزومه: <a href={authData.resume} target="_blank" rel="noopener noreferrer">دانلود رزومه</a>
                                        </Typography>
                                    )}
                                    {authData.is_staff && (
                                        <Button 
                                            variant="contained" 
                                            className="admin-button" 
                                            onClick={() => window.location.href = "https://alucarddev.ir/admin"}
                                            style={{ marginTop: '16px' }}
                                        >
                                            ورود به پنل ادمین
                                        </Button>
                                    )}
                                </Box>
                            )}
                            {editMode && !showArticleSubmission && (
                                <Box component="form" onSubmit={this.updateProfile} className="edit-form">
                                    <Typography variant="h6">ویرایش پروفایل</Typography>
                                    {updateError && <Typography className="error-text">{updateError}</Typography>}
                                    {updateSuccess && <Typography className="success-text">{updateSuccess}</Typography>}
                                    <TextField
                                        label="نام"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={this.handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                        className="text-field"
                                    />
                                    <TextField
                                        label="نام خانوادگی"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={this.handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                        className="text-field"
                                    />
                                    <TextField
                                        label="ایمیل"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={this.handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                        className="text-field"
                                    />
                                    <TextField
                                        label="بیوگرافی"
                                        name="bio"
                                        multiline
                                        rows={4}
                                        value={formData.bio}
                                        onChange={this.handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                        className="text-field"
                                    />
                                    <TextField
                                        label="کلمه عبور جدید"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={this.handleInputChange}
                                        fullWidth
                                        variant="outlined"
                                        className="text-field"
                                    />
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<UploadFileIcon />}
                                        className="upload-button"
                                    >
                                        آپلود عکس پروفایل
                                        <input
                                            type="file"
                                            name="profile_photo"
                                            accept="image/*"
                                            hidden
                                            onChange={this.handleFileChange}
                                        />
                                    </Button>
                                    <Button
                                        component="label"
                                        variant="outlined"
                                        startIcon={<UploadFileIcon />}
                                        className="upload-button"
                                    >
                                        آپلود رزومه
                                        <input
                                            type="file"
                                            name="resume"
                                            accept=".pdf,.doc,.docx"
                                            hidden
                                            onChange={this.handleFileChange}
                                        />
                                    </Button>
                                    <Box className="form-actions">
                                        <Button
                                            variant="outlined"
                                            onClick={this.toggleEditMode}
                                            className="cancel-button"
                                        >
                                            لغو
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            className="save-button"
                                            disabled={loadingUpdate}
                                        >
                                            {loadingUpdate ? <LinearProgress /> : 'ذخیره تغییرات'}
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                            <Divider className="divider" />

                            <Box className="section">
                                <Typography className="section-title">ثبت‌نام‌های شما در رویدادها:</Typography>
                                {registrationError && <Typography className="error-text">{registrationError}</Typography>}
                                {registrations.length === 0 && !registrationError && (
                                    <Typography className="error-text">ثبت‌نام فعالی وجود ندارد.</Typography>
                                )}
                                {registrations.length > 0 && (
                                    registrations.map((r) => (
                                        <Box key={r.id} className="registration-item">
                                            <Typography>{r.event_title} - {r.date_registered}</Typography>
                                            <Button 
                                                variant="contained" 
                                                className="cancel-registration-button"
                                                onClick={() => this.cancelRegistration(r.id)}
                                            >
                                                لغو
                                            </Button>
                                        </Box>
                                    ))
                                )}
                            </Box>
                            <Box className="logout-container">
                                <Button 
                                    onClick={this.handleLogOut} 
                                    variant="contained" 
                                    className="logout-button"
                                >
                                    خروج از سیستم
                                </Button>
                            </Box>
                        </Box>
                    </Fragment>
                )}
                {(!authData && !loadingUserInfo && !loadingRegistrations) && (
                    <Box className="no-auth">
                        <Typography className="error-text">لطفا ابتدا وارد شوید</Typography>
                    </Box>
                )}
            </Box>
        );
    }
}

export default connect(mapStateToProps, dispatchToProps)(AuthStatus);