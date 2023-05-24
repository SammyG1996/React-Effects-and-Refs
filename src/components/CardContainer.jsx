import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import Card from './Card';


const CardContainer = () => {

    const [cards, setCards] = useState([]);
    const [deckId, setDeckId] = useState(null)
    const timerId = useRef();

    const clearTimerId = () => {
            clearInterval(timerId.current);
            timerId.current = null;
    }

    const getAxiosCall = async (id=null) => {
        if(!id){
            const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(resp.data.deck_id)
        } else {
            const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            setCards( (currCards) => {
                return [...currCards, resp.data.cards[0]]
            })
            if(resp.data.remaining === 0){
                clearTimerId();
            }
        }
    }

    
    const handleClick = () => {
        if(!timerId.current){
            timerId.current = setInterval(() => {
                getAxiosCall(deckId);
            }, 1000)
        } else {
            clearTimerId();
        }

        
    }

    

    const handleReset = () => {
        setCards([]);
        setDeckId(null);
        getAxiosCall();
    }

    useEffect(() => {
        getAxiosCall();
    }, [])

  return (
    <div className='h-screen w-full flex items-center justify-center flex-col' >
        <div className='absolute top-0'>
        {cards.length < 51 ? <button className='border-2 px-3 py-2 text-white bg-cyan-700 hover:bg-cyan-500 self-start mt-8 mx-auto' onClick={handleClick} >{!timerId.current ? "Start Drawing" : "Stop Drawing"}</button> : null }
        <button className='border-2 px-3 py-2 text-white bg-red-700 hover:bg-red-500 self-start mt-8 mx-auto' onClick={handleReset}>Restart</button>
        </div>

        <div className='flex flex-wrap'>
            {cards.map((card, i) => {
                return <Card key={i} image={`${card.image}`} />
            })}
        </div>

    </div>
  )
}

export default CardContainer