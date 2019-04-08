import React from 'react';
import style from './FilterSearch.scss';
import { CostExplorer } from 'aws-sdk';

class FilterSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFilter: 'Women Like Me',
            size: '',
            height: '',
            bustSize: '',
            age: ''
        }

        this.changeFilter = this.changeFilter.bind(this);
        this.handleAgeInput = this.handleAgeInput.bind(this);
        this.clearSubFilter = this.clearSubFilter.bind(this);
    }

    changeFilter(e) {
        this.setState({ currentFilter : e.target.value }, () => {
            if(this.state.currentFilter === 'Rating'){
                this.props.sortByRating();
            } else if(this.state.currentFilter === 'Newest'){
                this.props.sortByNewest();
            } else if(this.state.currentFilter === 'Featured') {
                this.props.sortByFeatured();
            } else if(this.state.currentFilter === 'Women Like Me') {
                this.props.sortByFeatured();
            }
        });

    }

    clearSubFilter() {
        this.setState({
            size: '',
            height: '',
            bustSize: '',
            age: ''
        });
    }

    handleAgeInput(e) {
        this.setState({ [e.target.name] : e.target.value }, () => {
            this.props.filterByWomenLikeMe(this.state.size, this.state.height, this.state.bustSize, this.state.age);
        });
    }

    render() {
        var bustSizeArr = [];
        var bustSize = ['AA', 'A', 'B', 'C', 'D'];
        for(let i = 32; i <= 38; i++ ) {
            for(let j = 0; j < bustSize.length; j++){
                bustSizeArr.push( `${i}${bustSize[j]}`);
            }
        }
        

        var heightsArr = [];
        for(let i = 4; i <= 6; i++ ) {
            for(let j = 0; j < 12; j++){
                heightsArr.push( `${i}' ${j}"`);
            }
        }

        return(
            <div className={style.filterSearch}>
                <div className={style.filterSort}>
                    <p className={style.filterDetailLabel}>Sort</p>
                    <select className={style.select} onChange={this.changeFilter}>
                        <option value="Women Like Me" name="women_like_me">Women Like Me</option>
                        <option value="Featured" name="featured">Featured</option>
                        <option value="Newest" name="newest" >Newest</option>
                        <option value="Rating" name="rating" >Rating</option>
                    </select>
                </div>
                { 
                    this.state.currentFilter === 'Women Like Me' && (<div className={style.matchMySizeFilter}>
                        <p className={style.filterDetailLabel}>Match My Size</p>
                        <select className={style.select} name="size" onChange={this.handleAgeInput}>
                            <option value="">Size</option>
                            {
                                [...Array(12)].map((e, i) => <option key={i} value={i*2} name="size">{i*2}</option>)
                            }
                        </select>
                    
                    
                        <select className={style.select} name="height" onChange={this.handleAgeInput}>
                            <option>Height</option>
                            {
                                heightsArr.map( height => {
                                    return <option key={height} value={height} name="height" >{height}</option>
                                })
                            }
                        </select>
                    
                        <select className={style.select} name="bustsize" onChange={this.handleAgeInput}>
                            <option value="">Bust Size</option>
                            {
                                bustSizeArr.map( bustsize => {
                                    return <option key={bustsize} value={bustsize} name="bustsize" >{bustsize}</option>
                                })
                            }
                        </select>
                        <input type="text" className={style.input} name="age" placeholder="Age" value="" onChange={this.handleAgeInput}/>
                    </div>)
                }
            </div>
        );
    }
}

export default FilterSearch;