import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArticleComponent from './ArticleComponent'
import { setArticles } from '../redux/actions'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import InitialProdCont from './InitialProdCont'
import { CSSTransition } from "react-transition-group";
import { Button } from '@mui/material';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Fragment } from 'react'

export class ArticleInfo extends Component {

    componentDidMount() {
        this.props.goTop()
    }

    state = {
        extendedArtcleViews: false
    }


    render() {

        console.log("params params params params" + this.props.match.params.header)

        const m = this.props.articleData.filter((i) => i.title == this.props.match.params.header)
        const DataToShow = this.props.articleData.filter((i) => i.title == this.props.match.params.header)[0]
        console.log("article_Data", this.props.articleData)
        if (m.length != 0) {
            const otherArticles = this.props.articleData.filter(i => i.title != this.props.match.params.header)


            return (
                <div className='articleInfoContainer center flex-column'>
                    <div className="navSpacer"></div>

                    <div className='col-10'>
                        <h2 class="StoreIntroductionForDivision">انجمن علمی مهندسی کامپیوتر</h2>

                    </div>
                    <div className={`col-11 center ${!this.props.navBarSmallView && "row align-items-start"} ${this.props.navBarSmallView && "flex-column-reverse center"}`}>
                        <div className={` ${this.props.navBarSmallView && "col-12"} ${!this.props.navBarSmallView && "col-3"}`}>
                            <div className='center sideArticleCont row justify-content-start'>
                                <h2>سایر مقالات مرتبط </h2>
                                {otherArticles.slice(0, 2).map(i =>
                                    <ArticleComponent header={i.title} article={i.article} date={i.date} imageUrl={i.imageUrl} />
                                )}


                                <CSSTransition
                                    in={this.state.extendedArtcleViews}
                                    classNames="opac"
                                    timeout={400}
                                    unmountOnExit
                                >
                                    <Fragment>

                                        {otherArticles.slice(2).map(i =>
                                            <ArticleComponent header={i.title} article={i.article} date={i.date} imageUrl={i.imageUrl} />
                                        )}
                                    </Fragment>
                                </CSSTransition>

                                <CSSTransition
                                    in={!this.state.extendedArtcleViews}
                                    classNames="opac"
                                    timeout={400}
                                    unmountOnExit
                                >

                                    <Button onClick={() => { this.setState({ extendedArtcleViews: true }) }}><ExpandMoreSharpIcon /></Button>
                                </CSSTransition>

                                <CSSTransition
                                    in={this.state.extendedArtcleViews}
                                    classNames="opac"
                                    timeout={400}
                                    unmountOnExit
                                >

                                    <Button onClick={() => { this.setState({ extendedArtcleViews: false }) }}><ExpandLessIcon /></Button>
                                </CSSTransition>

                            </div>
                        </div>
                        <div className={`${this.props.navBarSmallView && "col-12"} ${!this.props.navBarSmallView && "col-8"} `}>
                            <div className={`${!this.props.navBarSmallView && "articleInfoContentContainer"}`}>
                                <h1 className='articleInfoContentContainerHead'>{DataToShow.title}</h1>
                                <div className='col-12 dateCont'>
                                    <span className='dirRtl'>تاریخ: 1402/03/08</span>
                                </div>
                                <p className='djangoHtmlContainer' dangerouslySetInnerHTML={{ __html: DataToShow.article }} ></p>

                            </div>
                            <div className='col-12 center AllrightsRecived'><span> copyright © 1402 کلیه حقوق مادی و معنوی برای ماهور محفوظ می باشد.</span></div>
                            <InitialProdCont EventData={this.props.EventData} />
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div className='articleInfoContainer center flex-column'>
                <div className="navSpacer"></div>

                <div className='col-11'>
                    <h2 class="StoreIntroductionForDivision">انجمن علمی مهندسی کامپیوتر</h2>

                </div>
                <div className='col-11 center row justify-content-start align-items-start'>
                    <div className='col-4'>
                        <div className='center sideArticleCont row justify-content-start'>
                            <h2>سایر مقالات مرتبط </h2>
                            {this.props.articleData.slice(0, 2).map(i =>
                                <ArticleComponent header={i.title} article={i.article} date={i.date} imageUrl={i.imageUrl} />
                            )}


                            <CSSTransition
                                in={this.state.extendedArtcleViews}
                                classNames="opac"
                                timeout={400}
                                unmountOnExit
                            >
                                <Fragment>

                                    {this.props.articleData.slice(2).map(i =>
                                        <ArticleComponent header={i.title} article={i.article} date={i.date} imageUrl={i.imageUrl} />
                                    )}
                                </Fragment>
                            </CSSTransition>

                            <CSSTransition
                                in={!this.state.extendedArtcleViews}
                                classNames="opac"
                                timeout={400}
                                unmountOnExit
                            >

                                <Button onClick={() => { this.setState({ extendedArtcleViews: true }) }}><ExpandMoreSharpIcon /></Button>
                            </CSSTransition>

                            <CSSTransition
                                in={this.state.extendedArtcleViews}
                                classNames="opac"
                                timeout={400}
                                unmountOnExit
                            >

                                <Button onClick={() => { this.setState({ extendedArtcleViews: false }) }}><ExpandLessIcon /></Button>
                            </CSSTransition>

                        </div>
                    </div>
                    <div className='col-8'>
                        <div className='articleInfoContentContainer '>
                            <div className='d-flex flex-row'>


                                <h1 className='articleInfoContentContainerHead'>  مقاله وجود نداره!</h1>
                            </div>
                            <div className='col-12 dateCont'>

                            </div>


                        </div>
                        <InitialProdCont EventData={this.props.EventData} />

                    </div>
                </div>
            </div>
        )
    }





}

const mapStateToProps = (state) => {
    return {
        articleData: state.articleData,
        EventData: state.EventData,
        navBarSmallView: state.navBarSmallView,


    }
}

const mapDispatchToProps = {
    setArticles: setArticles

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleInfo))