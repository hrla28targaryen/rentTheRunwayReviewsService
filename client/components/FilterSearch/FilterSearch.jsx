import React from 'react';
import style from './FilterSearch.scss';

class FilterSearch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFilter: 'Women Like Me',
            subfilter: ''
        }

        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter(e) {
        this.setState({ currentFilter : e.target.value });
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
                        <select className={style.select}>
                            <option>Size</option>
                            {
                                [...Array(23)].map((e, i) => {
                                    return (<option key={i.toString()} value={i.toString()} name="size" >{i.toString()}</option>)
                                })
                            }
                        </select>
                    
                    
                        <select className={style.select}>
                            <option>Height</option>
                            {
                                heightsArr.map( height => {
                                    return <option value={height} name="height" >{height}</option>
                                })
                            }
                        </select>
                    
                        <select className={style.select}>
                            <option>Bust Size</option>
                            {
                                bustSizeArr.map( bustsize => {
                                    return <option value={bustsize} name="bustsize" >{bustsize}</option>
                                })
                            }
                        </select>
                        <input type="text" className={style.input} name="Age" placeholder="Age"/>
                    </div>)
                }
            </div>
        );
    }
}

export default FilterSearch;