import React, { Component } from 'react';
import { Button, TextField, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LinearProgress from '@mui/material/LinearProgress';
import { Cookies } from 'react-cookie';


class ArticleSubmission extends Component {
    c = new Cookies();

    state = {
        formData: {
            header: '',
            article: '',
            date: new Date().toISOString().split('T')[0], // Default to today
            image: null
        },
        loading: false,
        error: null,
        success: null
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [name]: value },
            error: null,
            success: null
        }));
    };

    handleFileChange = (e) => {
        const { name, files } = e.target;
        this.setState(prevState => ({
            formData: { ...prevState.formData, [name]: files[0] },
            error: null,
            success: null
        }));
    };

    submitArticle = (e) => {
        e.preventDefault();
        const token = this.c.get("sessionId");
        if (!token) {
            this.setState({ error: "لطفا ابتدا وارد شوید" });
            this.props.showSuccessAlert("خطا!", "لطفا ابتدا وارد شوید", "error");
            return;
        }

        const { header, article, date, image } = this.state.formData;
        if (!header || !article || !date) {
            this.setState({ error: "همه فیلدها الزامی هستند" });
            this.props.showSuccessAlert("خطا!", "همه فیلدها الزامی هستند", "error");
            return;
        }

        this.setState({ loading: true, error: null, success: null });
        const formData = new FormData();
        formData.append('header', header);
        formData.append('article', article);
        formData.append('date', date);
        if (image) formData.append('image', image);

        fetch("https://alucarddev.ir/digitalAssets/create_article", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ loading: false });
                if (data.status === "ok") {
                    this.setState({ 
                        success: data.message,
                        formData: {
                            header: '',
                            article: '',
                            date: new Date().toISOString().split('T')[0],
                            image: null
                        }
                    });
                    this.props.showSuccessAlert("موفق!", data.message, "success");
                    this.props.onClose();
                } else {
                    this.setState({ error: data.message || "خطا در ارسال مقاله" });
                    this.props.showSuccessAlert("خطا!", data.message || "خطا در ارسال مقاله", "error");
                }
            })
            .catch(error => {
                console.error("Error submitting article:", error);
                this.setState({ loading: false, error: "خطا در ارتباط با سرور" });
                this.props.showSuccessAlert("خطا!", "خطا در ارتباط با سرور", "error");
            });
    };

    render() {
        const { formData, loading, error, success } = this.state;

        return (
            <Box className="article-submission-cont">
                <IconButton className="close-button" onClick={this.props.onClose}>
                    <CloseIcon />
                </IconButton>
                <Typography variant="h6" className="form-title">ارسال مقاله جدید</Typography>
                {error && <Typography className="error-text">{error}</Typography>}
                {success && <Typography className="success-text">{success}</Typography>}
                {loading && (
                    <Box className="progress-bar">
                        <LinearProgress />
                    </Box>
                )}
                <Box component="form" onSubmit={this.submitArticle} className="submission-form">
                    <TextField
                        label="عنوان مقاله"
                        name="header"
                        value={formData.header}
                        onChange={this.handleInputChange}
                        fullWidth
                        variant="outlined"
                        className="text-field"
                    />
                    <TextField
                        label="متن مقاله"
                        name="article"
                        multiline
                        rows={6}
                        value={formData.article}
                        onChange={this.handleInputChange}
                        fullWidth
                        variant="outlined"
                        className="text-field"
                    />
                    <TextField
                        label="تاریخ"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={this.handleInputChange}
                        fullWidth
                        variant="outlined"
                        className="text-field"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadFileIcon />}
                        className="upload-button"
                    >
                        آپلود تصویر
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            hidden
                            onChange={this.handleFileChange}
                        />
                    </Button>
                    <Box className="form-actions">
                        <Button
                            variant="outlined"
                            onClick={this.props.onClose}
                            className="cancel-button"
                        >
                            لغو
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? <LinearProgress /> : 'ارسال مقاله'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

export default ArticleSubmission;