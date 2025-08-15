import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DOMPurify from 'dompurify';
import InfoIcon from '@mui/icons-material/Info';

export class ArticleComponent extends Component {

    render() {



        const sanitizedContent = DOMPurify.sanitize(this.props.article, { ALLOWED_TAGS: ['p'] });
        const words = sanitizedContent.split(/\s+/); // Split content into words
        const truncatedContent = words.slice(0, 36).join(' '); // Take the first 100 words

        return (
            <Link className="ArticleLink" to={`/articles/${this.props.header}`}>
                <div className='col-12 center justify-content-end'>
                    <div className='col-10 center flex-column'>
                        <InfoIcon className='informIcon'/>
                        <div className='beautiPointer'></div>
                    </div>
                </div>
                <div className='ArticleComponent'>
                    <img src={this.props.imageUrl} alt={this.props.header} />
                    <div className='articleContentCont'>
                        <h2>{this.props.header}</h2>
                        <p dangerouslySetInnerHTML={{ __html: truncatedContent + " . . ." }} ></p>
                    </div>
                    <div className='col-12 center justify-content-end mt-3'>

                        <span className="seeMoreArticleLink">بیشتر ببین <OpenInNewIcon /></span>
                    </div>
                </div>
            </Link>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        articleData: state.articleData

    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleComponent)
