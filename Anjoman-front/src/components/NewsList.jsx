import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';


class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = { news: [], error: null };
    this.c = props.cookies;
    this.scrollRef = React.createRef();
  }

  componentDidMount() {
    const token = this.c.get('sessionId');
    fetch('https://alucarddev.ir/digitalAssets/news_list', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) this.setState({ news: data.data });
        else this.setState({ error: data.message });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: 'خطا در دریافت اخبار' });
      });
  }

  handleCardClick = (id) => {
    this.props.history.push(`/news/${id}`);
  };

  handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleCardClick(id);
    }
  };

  // Scroll by visible width chunk. Positive moves visually left (next items),
  // negative moves visually right (previous items) because we use row-reverse.
  scrollByChunk = (direction = 1) => {
    const el = this.scrollRef.current;
    if (!el) return;
    const distance = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  render() {
    const { news, error } = this.state;

    return (
      <div className="news-horizontal-wrap" dir="rtl" aria-live="polite">
        <h2 className="news-h-title">اخبار</h2>

        {error && <div className="news-error">{error}</div>}

        {news.length > 0 ? (
          <div className="hscroll-outer">
            <button
              className="hscroll-btn btn-prev"
              aria-label="قبلی"
              onClick={() => this.scrollByChunk(-1)}
            >‹</button>

            <div className="hscroll" ref={this.scrollRef} tabIndex="0" role="list">
              {news.map(item => (
                <article
                  className="news-card-small"
                  key={item.id}
                  role="listitem"
                  tabIndex="0"
                  onClick={() => this.handleCardClick(item.id)}
                  onKeyDown={(e) => this.handleCardKeyDown(e, item.id)}
                  title={item.title}
                  aria-label={`${item.title} — ${item.author}`}
                >
                  <div className="card-media">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="card-img" />
                    ) : (
                      <div className="card-noimg">بدون تصویر</div>
                    )}
                  </div>
                  <div className="card-info">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-meta">{item.author} — <time>{item.date}</time></p>
                  </div>
                </article>
              ))}
            </div>

            <button
              className="hscroll-btn btn-next"
              aria-label="بعدی"
              onClick={() => this.scrollByChunk(1)}
            >›</button>
          </div>
        ) : (
          <p className="no-news">هیچ اخباری موجود نیست</p>
        )}
      </div>
    );
  }
}

export default withRouter(withCookies(NewsList));
