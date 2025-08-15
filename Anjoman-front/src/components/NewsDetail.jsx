import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { withRouter } from 'react-router-dom';
import Ncomment from './Ncomment.jsx';

class NewsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null,
      error: null,
    };
    this.c = props.cookies;
  }

  componentDidMount() {
    this.props.goTop()

    const { id } = this.props.match.params;
    const token = this.c.get('sessionId');
    fetch(`https://alucarddev.ir/digitalAssets/news_list`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          const newsItem = data.data.find(item => item.id === parseInt(id));
          if (newsItem) {
            this.setState({ news: newsItem });
          } else {
            this.setState({ error: 'خبر یافت نشد' });
          }
        } else {
          this.setState({ error: data.message });
        }
      })
      .catch(error => {
        this.setState({ error: 'خطا در دریافت خبر' });
        console.error('Error:', error);
      });
  }

  handleBack = () => {
    this.props.history.push('/');
  };

  render() {
    const { news, error } = this.state;

    if (error) {
      return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
          <Typography color="error">{error}</Typography>
          <Button variant="contained" onClick={this.handleBack} sx={{ marginTop: '1rem' }}>
            بازگشت
          </Button>
        </Box>
      );
    }

    if (!news) {
      return <Box sx={{ padding: '2rem' }}>در حال بارگذاری...</Box>;
    }

    return (
      <Box className="d-flex justify-content-center align-items-center flex-column " sx={{ padding: '0rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Button variant="contained" onClick={this.handleBack} sx={{ marginBottom: '1rem' }}>
          بازگشت
        </Button>
        <Card className='col-xs-12 col-sm-12 col-md-12 col-lg-9 col-xl-8 col-xxl-6' sx={{  margin: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
          {news.image && (
            <CardMedia
              component="img"
              // height=""
              image={news.image}
              alt={news.title}
              sx={{ borderRadius: '8px', border: '1px solid #f0f0f0', objectFit: 'cover' }}
            />
          )}
          <CardContent>
            <Typography variant="h4" sx={{ fontFamily: 'Roboto', fontWeight: 600, color: '#1a1a1a', marginBottom: '1rem' }}>
              {news.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Roboto', marginBottom: '1rem' }}>
              نوشته شده توسط {news.author} در تاریخ {news.date}
            </Typography>
            <div
              dangerouslySetInnerHTML={{ __html: news.content }}
              style={{ fontFamily: 'Roboto', fontSize: '16px', lineHeight: '1.6', color: '#333' }}
            />
          </CardContent>
        </Card>
        <Ncomment newsId={this.state.news.id}/>
      </Box>
    );
  }
}

export default withRouter(withCookies(NewsDetail));