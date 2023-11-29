// STRETCH
const cars =[
    {
    vin:'4T1BF32K73U041600',
    make:'toyota',
    model: 'prius',
    mileage: 3000,
    title:'clean',
    transmission:'manual',
},
{
    vin: '3GYFNEEY1AS523815',
    make:'ford',
    model: 'raptor',
    mileage: 10000,
    title:'salvage',

},
{
    vin: '1J4GW68S2XC695137',
    make:'dodge',
    model: 'ram rebel',
    mileage: 10000,
   
}

]
exports.seed = async function(knex){
  await knex('cars').truncate()
  await knex('cars').insert(cars)
}
