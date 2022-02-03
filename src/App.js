import {Formik, Form} from 'formik'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'
import { useState } from 'react'
import * as Yup from 'yup'

const compoundInterest = (deposit, contribution, years, rate)=>{
  let total = deposit
  for(let i=0; i<years;i++){
    total = (total + contribution)*(rate + 1)
  }
  return Math.round(total)
}

const Formate = new Intl.NumberFormat('es-US',{
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

const App = () =>{
  const [balance, setBalance] = useState('')
  const handledSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(Formate.format(val))
  }
  return(
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: ''
          }}
          onSubmit={handledSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Requerido').typeError('El valor debe de ser numerico'),
            contribution: Yup.number().required('Requerido').typeError('El valor debe de ser numerico'),
            years: Yup.number().required('Requerido').typeError('El valor debe de ser numerico'),
            rate: Yup.number()
                  .required('Requerido')
                  .typeError('El valor debe de ser numerico')
                  .min(0,'El valor minimo es 0')
                  .max(1,'El valor maximo es 1')
          })}
        >
          <Form>
            <Input name='deposit' label='Deposito inicial'/>
            <Input name='contribution' label='Contrubucion anual'/>
            <Input name='years' label='Años'/>
            <Input name='rate' label='Interes estimado'/>
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== "" ? <Balance>Balance final {balance}</Balance> : null}
      </Section>
    </Container>
  )
}

export default App