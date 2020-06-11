import React, { Component } from 'react';
import { CastList, TrailerList, MovieList} from '../components';
import { CAST_MAX_NUM, TRAILER_MAX_NUM ,RECOMMENDATION_MAX_NUM} from '../const';
import { Grid, Row, Col} from 'react-bootstrap/lib';
import { MovieInfo, Poster } from '../components';
import { connect } from 'react-redux';
import SubTitle from '../components/SubTitle';
import { fetchMovieDetail, fetchCastList, fetchTrailerList, fetchRecommendationList} from '../actions';


class MovieDetail extends Component {

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchMovieDetail(this.props.params.id));
    dispatch(fetchCastList(this.props.params.id));
    dispatch(fetchTrailerList(this.props.params.id));
    dispatch(fetchRecommendationList(this.props.params.id));
  }

  componentWillReceiveProps(nextProps) {
     const {dispatch} = this.props;
     if(nextProps.params.id && this.props.params.id !== nextProps.params.id) {
         dispatch(fetchMovieDetail(nextProps.params.id));
         dispatch(fetchCastList(nextProps.params.id));
         dispatch(fetchTrailerList(nextProps.params.id));
         dispatch(fetchRecommendationList(nextProps.params.id));
         
      }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //     if(this.props.movie.id !== nextProps.movie.id) {
  //       //console.log('shouldComponentUpdate');
  //       return true;
  //     }
  //     return false;
  // }

  render() {
    const {movie, casts, trailers, recommendation, isFetcing_movie, isFetcing_casts, isFetcing_trailers, isFetcing_recommendation} = this.props;

    if(isFetcing_movie || isFetcing_casts || isFetcing_trailers || isFetcing_recommendation) {
      return <p>loading...</p>
    }
    if(movie.hasOwnProperty('id')) {
      return(
        <Grid fluid={false}>
          <Row>
            <Col xs={12} sm={6} md={4}>
              <Poster id={movie.id} path={movie.poster_path} responsive />
            </Col>
            <Col xs={12} sm={6} md={8}>
              <MovieInfo movie={movie}/>
              <CastList data={casts.slice(0,CAST_MAX_NUM)} />
            </Col>
          </Row>
          <Row>
            <TrailerList data={trailers.slice(0,TRAILER_MAX_NUM)} />
          </Row>
          <Row>
            <SubTitle title={'You Might Also Like:'} />
            < MovieList movies={recommendation.slice(0,RECOMMENDATION_MAX_NUM)} />
          </Row>

        </Grid>
      );
    } else
      return null;

  }
}

function mapStateToProps(state){
  const {movieDetail, castList, trailerList, recommendationList} = state;
  const {isFetcing_movie, item: movie, error_movie} = movieDetail;
  const {isFetcing_casts, items: casts, error_casts} = castList;
  const {isFetcing_trailers, items: trailers, error_trailers} = trailerList;
  const {isFetcing_recommendation , items: recommendation, error_recommendation} = recommendationList;

  return {isFetcing_movie, movie, error_movie, isFetcing_casts, casts, error_casts, isFetcing_trailers, trailers, error_trailers, isFetcing_recommendation, recommendation, error_recommendation}
}

export default connect(mapStateToProps)(MovieDetail);
