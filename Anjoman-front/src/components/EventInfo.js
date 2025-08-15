import React, { Component } from 'react'
import { connect } from 'react-redux'
import Openion from './Openion'
import Footer from './Footer'
import EventMobile from '../EventMobile'
import EventRegistration from './EventRegistration'
import { setNavMenuState } from '../redux/actions'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import { Fragment } from 'react'
import { Button, Typography, Paper, Grid, Box, Divider, TextField, Chip } from '@mui/material'
import { Cookies } from 'react-cookie'
import ImageLargeViewComponent from './imageLargeViewComponent'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import WhatshotIcon from '@mui/icons-material/Whatshot'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import ColorItem from './ColorItem'
import PeopleIcon from '@mui/icons-material/People'

export class EventInfo extends Component {
    constructor() {
        super()
        this.appRef = React.createRef()
        this.openionRef = React.createRef()
    }

    state = {
        cMessage: "",
        commentData: null,
        imageData: null,
        bigImageShowOpen: false,
        selectedColor: "",
        selectedColorCode: "",
    }

    commentDataAqusition = (djangoId) => {
        fetch("https://alucarddev.ir/digitalAssets/getComments", {
            method: "POST",
            body: JSON.stringify({ djangoId: djangoId })
        })
            .then(r => r.json())
            .then(data => {
                this.setState({ commentData: data.data })
            })
    }

    selectColor = i => {
        this.setState({ selectedColor: i.colorName, selectedColorCode: i.color })
    }

    handleCommentInpChange = e => {
        this.setState({ cMessage: e.target.value })
    }

    c = new Cookies()
    scrollHandler = () => {
        if (Number(this.appRef.current.scrollTop) < 100 && this.props.navMenoOpen) {
            this.props.setNavMenuState(false)
            return
        }
        if (Number(this.appRef.current.scrollTop) > 100 && !this.props.navMenoOpen) {
            this.props.setNavMenuState(true)
            return
        }
    }

    componentDidMount() {
        const specificData = this.props.EventData.filter((i) => i.title === this.props.match.params.id)[0]
        document.title = `رویداد ${specificData.title} | ${specificData.divisions}`
        this.setState({ imageData: specificData.eventImgUrl })
        this.commentDataAqusition(specificData.djangoId)
        this.props.goTop()
    }

    switchPics = (p) => {
        var d = this.state.imageData
        const toAddToRight = d[0]
        const newMainIndex = d.indexOf(p)
        d[0] = d[newMainIndex]
        d[newMainIndex] = toAddToRight
        this.setState({ imageData: d })
    }

    submitAComment = (eventId) => {
        fetch("https://alucarddev.ir/digitalAssets/submitAComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.c.get("sessionId")}`
            },
            body: JSON.stringify({
                eventId: eventId,
                message: this.state.cMessage,

            })
        })
            .then(r => r.json())
            .then(d => console.log(d))
    }


    handleOpenionRefView = () => {
        this.openionRef.current.scrollIntoView({ behavior: "smooth" })
    }

    switchBigImageShow = () => {
        this.setState({ bigImageShowOpen: !this.state.bigImageShowOpen })
    }

    render() {
        const specificData = this.props.EventData.filter((i) => i.title === this.props.match.params.id)[0]
        const eventsWithSamedivision = this.props.EventData.filter((i) => i.divisions === specificData.divisions)
        const eventId = specificData.eventId
        return (
            <Fragment>
                {this.state.imageData && this.state.bigImageShowOpen &&
                    <ImageLargeViewComponent
                        imageData={this.state.imageData}
                        switchPics={this.switchPics}
                        switchBigImageShow={this.switchBigImageShow}
                        imgurl={this.state.imageData[0]}
                    />
                }
                <Box
                    ref={this.appRef}
                    onScroll={this.scrollHandler}
                    sx={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        padding: { xs: '16px', md: '32px' },
                        bgcolor: '#fff',
                        minHeight: '100vh'
                    }}
                >
                    <Grid container spacing={4}>
                        {/* Main Image and Title */}
                        <Grid item xs={12}>
                            {this.state.imageData && (
                                <Box sx={{ mb: 4 }}>
                                    <Box
                                        component="img"
                                        src={this.state.imageData[0]}
                                        alt={specificData.title}
                                        sx={{
                                            width: '100%',
                                            maxHeight: '500px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            animation: 'fadeIn 0.5s ease-in-out',
                                            cursor: 'pointer'
                                        }}
                                        onClick={this.switchBigImageShow}
                                    />
                                    {this.state.imageData.length > 1 && (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                overflowX: 'auto',
                                                gap: '8px',
                                                mt: 2,
                                                pb: 1,
                                                '&::-webkit-scrollbar': { height: '8px' },
                                                '&::-webkit-scrollbar-thumb': { background: '#ff9800', borderRadius: '4px' }
                                            }}
                                        >
                                            {this.state.imageData.slice(1).map(i => (
                                                <Box
                                                    key={i}
                                                    component="img"
                                                    src={i}
                                                    alt="thumbnail"
                                                    sx={{
                                                        width: { xs: '80px', md: '100px' },
                                                        height: { xs: '80px', md: '100px' },
                                                        objectFit: 'cover',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        transition: 'transform 0.3s ease',
                                                        '&:hover': { transform: 'scale(1.05)' }
                                                    }}
                                                    onClick={() => this.switchPics(i)}
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontFamily: '"Times New Roman", serif',
                                        fontSize: { xs: '2rem', md: '3rem' },
                                        fontWeight: 'bold',
                                        color: '#000'
                                    }}
                                >
                                    {specificData.title}
                                </Typography>
                                <Chip
                                    icon={<PeopleIcon />}
                                    label={`${specificData.registrationCount} نفر ثبت‌نام کرده‌اند`}
                                    sx={{
                                        bgcolor: '#ff9800',
                                        color: '#fff',
                                        fontFamily: '"Roboto", sans-serif',
                                        fontWeight: 'medium',
                                        borderRadius: '16px',
                                        padding: '4px 8px',
                                        height: '32px',
                                        '& .MuiChip-icon': { color: '#fff' }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                                <Typography variant="subtitle1" sx={{ color: '#ff9800' }}>
                                    {specificData.divisions}
                                </Typography>
                                <Typography variant="subtitle1"> | </Typography>
                                <Typography variant="subtitle1" sx={{ color: '#ff9800' }}>
                                    {specificData.subDivisions !== "None" ? specificData.subDivisions : ''}
                                </Typography>
                            </Box>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    color: '#666',
                                    mt: 1,
                                    fontStyle: 'italic'
                                }}
                            >
                                توسط انجمن علمی مهندسی کامپیوتر
                            </Typography>
                        </Grid>

                        {/* Main Content and Sidebar */}
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={8}>
                                {/* Introduction */}
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        mb: 4,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontFamily: '"Times New Roman", serif',
                                            mb: 2,
                                            color: '#000'
                                        }}
                                    >
                                        درباره رویداد
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: '"Roboto", sans-serif',
                                            lineHeight: 1.8,
                                            color: '#333'
                                        }}
                                    >
                                        {specificData.introduction}
                                    </Typography>
                                </Paper>

                                {/* Features */}
                                {specificData.features.length > 0 && (
                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 3,
                                            mb: 4,
                                            border: '1px solid #e0e0e0',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontFamily: '"Times New Roman", serif',
                                                mb: 2,
                                                color: '#000'
                                            }}
                                        >
                                            ویژگی‌های کلیدی
                                        </Typography>
                                        <Box component="ul" sx={{ pl: 2, color: '#333' }}>
                                            {specificData.features.map(i => (
                                                <Box component="li" key={i} sx={{ mb: 1, fontFamily: '"Roboto", sans-serif' }}>
                                                    {i}
                                                </Box>
                                            ))}
                                        </Box>
                                    </Paper>
                                )}
                            </Grid>

                            {/* Sidebar */}
                            <Grid item xs={12} md={4}>
                                <Box sx={{ position: 'sticky', top: '20px', zIndex: 10 }}>
                                    <Box sx={{ mb: 4, zIndex: 11 }}>
                                        <EventRegistration
                                            colorCode={this.state.selectedColorCode}
                                            colorName={this.state.selectedColor}
                                            price={specificData.price}
                                            data={specificData}
                                            eventId={specificData.eventId}
                                        />
                                    </Box>
                                    {specificData.eventColor.length > 0 && (
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                mb: 4,
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: '"Times New Roman", serif',
                                                    mb: 2,
                                                    color: '#000'
                                                }}
                                            >
                                                گزینه‌های رنگ
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {specificData.eventColor.map(i => (
                                                    <ColorItem
                                                        key={i.colorName}
                                                        color={i.color}
                                                        name={i.colorName}
                                                        onClick={() => this.selectColor(i)}
                                                    />
                                                ))}
                                            </Box>
                                        </Paper>
                                    )}
                                    {eventsWithSamedivision.length > 0 && (
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                border: '1px solid #e0e0e0',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: '"Times New Roman", serif',
                                                    mb: 2,
                                                    color: '#000'
                                                }}
                                            >
                                                رویدادهای مرتبط
                                            </Typography>
                                            <Swiper
                                                grabCursor={true}
                                                centeredSlides={false}
                                                loop={false}
                                                slidesPerView={1}
                                                pagination={{ el: '.swiper-pagination', clickable: true }}
                                                navigation={{
                                                    nextEl: '.swiper-button-next',
                                                    prevEl: '.swiper-button-prev',
                                                    clickable: true,
                                                }}
                                                modules={[Pagination, Navigation]}
                                                style={{ marginBottom: '16px' }}
                                            >
                                                {eventsWithSamedivision.map(i => (
                                                    <SwiperSlide key={i.title}>
                                                        <EventMobile
                                                            title={i.title}
                                                            price={i.price}
                                                            img={i.imgUrl}
                                                            data={i}
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                                <Box className="slider-controler">
                                                    <Box className="swiper-button-prev" />
                                                    <Box className="swiper-button-next" />
                                                    <Box className="swiper-pagination" />
                                                </Box>
                                            </Swiper>
                                        </Paper>
                                    )}
                                </Box>
                            </Grid>

                            {/* Comments Section */}
                            <Grid item xs={12}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 3,
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px'
                                    }}
                                    ref={this.openionRef}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontFamily: '"Times New Roman", serif',
                                            mb: 2,
                                            color: '#000'
                                        }}
                                    >
                                        نظرات خوانندگان
                                    </Typography>
                                    {this.state.commentData != null && this.state.commentData.length > 0 ? (
                                        this.state.commentData.map(i => (
                                            <Openion data={i} key={i.id || Math.random()} />
                                        ))
                                    ) : (
                                        <Typography sx={{ color: '#666', fontStyle: 'italic' }}>
                                            هنوز نظری برای این رویداد ثبت نشده است.
                                        </Typography>
                                    )}
                                    {this.props.isLoggedIn && (
                                        <Box sx={{ mt: 3 }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontFamily: '"Times New Roman", serif',
                                                    mb: 2,
                                                    color: '#000'
                                                }}
                                            >
                                                نظر خود را بنویسید
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={this.state.cMessage}
                                                onChange={this.handleCommentInpChange}
                                                placeholder="نظر شما درباره این رویداد..."
                                                variant="outlined"
                                                sx={{ mb: 2 }}
                                            />
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    bgcolor: '#ff9800',
                                                    '&:hover': { bgcolor: '#f57c00' },
                                                    fontFamily: '"Roboto", sans-serif'
                                                }}
                                                onClick={() => this.submitAComment(eventId)}
                                            >
                                                ارسال نظر
                                            </Button>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navMenoOpen: state.navMenoOpen,
        navBarSmallView: state.navBarSmallView,
        EventData: state.EventData,
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = {
    setNavMenuState: setNavMenuState
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventInfo))