import React from 'react'

 const Pokemon = (props) => {
     const {match} = props
     const {params} = match
     const {pokemondId} = params

     return (
         <div>
             {`this is a pokemon page for #${pokemonId}`}
         </div>
     )
 }

 export default Pokemon