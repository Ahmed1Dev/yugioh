import React from 'react';
import { is_monster, is_spell, is_trap } from './utils/utils'
import { left_panel_mouse_in } from '../../Store/actions/mouseActions';
import { connect } from 'react-redux';
import MonsterView from './Monster/MonsterView'
/**
 * View container for a card
 */
class CardView extends React.Component {
    constructor(props) {
        super(props);
    }

    onMouseEnterHandler = (info) => {
        this.props.mouse_in_view(info);
    }

    render() {
        const {card} = this.props;
        if (card) {
            const card_type = card.card.card_type // card is decorated with env\
            const info = {
                cardEnv: card
            }
            // const view = () => {
            //     if (is_monster(card_type)) {
            //         const info = {
            //             cardEnv: card
            //         }
            //         return <MonsterView card={this.props.card}/>
            //     } else {
            //         return <p>Developing...</p>
            //     }
            // }
            // return(
            //     <div onMouseEnter={()=>this.onMouseEnterHandler(info)}>
            //         {view()}
            //     </div>
            // )

            if (is_monster(card_type)) {
                const info = {
                    cardEnv: card
                }
                return <MonsterView card={this.props.card}/>
            } else {
                return <p>Developing...</p>
            }
        } else {
            return (
                <p>Loading...</p>
            )
        }
        
    }

}

const mapStateToProps = state => {
    const { left_panel_cardEnv } = state.mouseReducer
    const { environment } = state.environmentReducer
    return { left_panel_cardEnv, environment };
};

const mapDispatchToProps = dispatch => ({
    mouse_in_view: (info) => dispatch(left_panel_mouse_in(info)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardView);