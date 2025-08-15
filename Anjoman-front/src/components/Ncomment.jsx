import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, Divider, LinearProgress } from '@mui/material';

class Ncomment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            newComment: '',
            loading: false,
            error: null,
        };
        this.c = props.cookies;
    }

    componentDidMount() {
        this.fetchComments();
    }

    fetchComments = () => {
        const token = this.c.get('sessionId');
        this.setState({ loading: true });
        console.log(this.props.newsId)
        fetch(`https://alucarddev.ir/digitalAssets/get_news_comments/${this.props.newsId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ loading: false });
                console.log('Comments Response:', data); // Debug log
                if (data.status === 200) {
                    this.setState({ comments: data.data });
                } else {
                    this.setState({ error: data.message });
                }
            })
            .catch(error => {
                this.setState({ loading: false, error: 'خطا در دریافت نظرات' });
                console.error('Error:', error);
            });
    };

    handleCommentChange = (event) => {
        this.setState({ newComment: event.target.value });
    };

    submitComment = () => {
        const token = this.c.get('sessionId');
        const { newComment } = this.state;
        if (!newComment.trim()) {
            this.setState({ error: 'نظر نمی‌تواند خالی باشد' });
            return;
        }

        fetch(`https://alucarddev.ir/digitalAssets/submit_news_comment/${this.props.newsId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: newComment }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Submit Comment Response:', data); // Debug log
                if (data.status === 200) {
                    this.setState({ newComment: '', error: null });
                    this.fetchComments();
                } else {
                    this.setState({ error: data.message });
                }
            })
            .catch(error => {
                this.setState({ error: 'خطا در ارسال نظر' });
                console.error('Error:', error);
            });
    };

    render() {
        const { comments, newComment, loading, error } = this.state;

        return (
            <Box className="col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-8 col-xxl-6" sx={{
                mt: 4,
                p: 3,
                background: '#fff',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e0e0e0',
                direction: 'rtl',
                textAlign: 'right',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                    نظرات
                </Typography>
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                {loading ? (
                    <LinearProgress />
                ) : (
                    <List>
                        {comments.map(comment => (
                            <ListItem key={comment.id} sx={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                                <ListItemText
                                    primary={
                                        <Typography sx={{ fontWeight: 600, color: '#1a1a1a' }}>
                                            {comment.user}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                                {comment.date}
                                            </Typography>
                                            <Typography variant="body1" sx={{ color: '#333' }}>
                                                {comment.content}
                                            </Typography>
                                        </>
                                    }
                                />
                                <Divider sx={{ my: 1, width: '100%' }} />
                            </ListItem>
                        ))}
                        {comments.length === 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                                هیچ نظری موجود نیست
                            </Typography>
                        )}
                    </List>
                )}
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, fontWeight: 600, color: '#1a1a1a' }}>
                    افزودن نظر جدید
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    value={newComment}
                    onChange={this.handleCommentChange}
                    placeholder="نظر خود را بنویسید..."
                    sx={{
                        mb: 2,
                        '& .MuiInputBase-root': {
                            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                            direction: 'rtl',
                            textAlign: 'right',
                            background: '#f9f9f9',
                            borderRadius: '8px',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.submitComment}
                    sx={{
                        borderRadius: '8px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        textTransform: 'none',
                        padding: '8px 16px',
                    }}
                >
                    ارسال نظر
                </Button>
            </Box>
        );
    }
}

export default withCookies(Ncomment);