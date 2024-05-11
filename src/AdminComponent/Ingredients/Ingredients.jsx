import React from 'react'
import IngredientTable from './IngredientTable';
import { Grid } from '@mui/material';
import IngredientCategoryTable from './IngredientCategoryTable';

const Ingredients = () => {
  return (
    <div>
      <Grid container spacing={2} >
        <Grid item xs={12} lg={9} >
             <IngredientTable/>
        </Grid>
        <Grid item xs={12} lg={3}>
            <IngredientCategoryTable/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Ingredients;