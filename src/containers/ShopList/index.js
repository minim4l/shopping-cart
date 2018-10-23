import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Dimmer, Loader, Image, Segment, Container } from 'semantic-ui-react';
import './style.css';
import { loadArticle, addToCart } from '../../actions';
import ShopItem from '../../components/ShopItem';

const mapStateToProps = store => ({
    items: store.items          //Check for elements and then filter them
        ? store.filter.category == 'All'
            ? store.items
                .filter( item => item.text.toLowerCase().includes( store.filter.search.toLowerCase()) ) 
            : store.items.filter( item => item.category == store.filter.category)
                .filter( item => item.text.toLowerCase().includes( store.filter.search.toLowerCase()) )
        : null         
});
const mapDispatchToProps = dispatch => ({
    loadArticle: dispatch(loadArticle()),
    addToCart: item => dispatch(addToCart(item))
})

class ShopList extends Component {
    addToCart = (item) => {
        this.props.addToCart( item );
    }
    componentDidMount() {
        !this.props.items && this.props.loadArticle;
    }
    render() {
        const { items } = this.props;
        return (
            <div>
                {
                    !items
                        ? <div>
                            <Segment className="preloader">
                                <Dimmer active inverted >
                                    <Loader>Loading</Loader>
                                </Dimmer>
                            </Segment>

                        </div>
                        : items.length 
                            ?   <Card.Group itemsPerRow={4}>
                                    {
                                        items.map(item =>
                                            <ShopItem
                                                key = { item.id } 
                                                text = { item.text } 
                                                category = { item.category }
                                                price = { item.price }
                                                addToCart = { this.addToCart } 
                                                item = { item }
                                                />
                                            )
                                    }
                                </Card.Group>
                            : <Container textAlign='center'><h2>Nothing Found :(</h2></Container>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopList);