import translate from '../../i18n/translate'

export const stringifyNumber = (n) => {
  const special = [
    'zeroth',
    'first',
    'second',
    'third',
    'fourth',
    'fifth',
    'sixth',
    'seventh',
    'eighth',
    'ninth',
    'tenth',
    'eleventh',
    'twelfth',
    'thirteenth',
    'fourteenth',
    'fifteenth',
    'sixteenth',
    'seventeenth',
    'eighteenth',
    'nineteenth',
  ]
  const deca = [
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ]

  if (n < 20) return special[n % 10]
  if (n % 10 === 0) return deca[Math.floor(n / 10) - 2] + 'ieth'
  return (
    translate(`components.offerForm.${deca[Math.floor(n / 10) - 2]}`) +
    translate(`components.offerForm.${special[n % 10]}`)
  )
}

// This function is needed to transform numeric inputs with ',' to '.'
export const parseOfferNumericInputs = (formData) => {
  // Convert all , into .
  const parsedForm = { ...formData }
  for (let i = 0; i < parsedForm.deployments.length; i++) {
    const deploy = parsedForm.deployments[i]
    deploy.commission_rate = deploy.commission_rate.toString().replace(',', '.')
    deploy.revenue_share = deploy.revenue_share.toString().replace(',', '.')
    deploy.scenarios.forEach((scenario) => {
      scenario.raw_amount = scenario.raw_amount.toString().replace(',', '.')
      scenario.covenants.forEach(
        (covenant, i) =>
          (scenario.covenants[i].target_value = covenant.target_value
            .toString()
            .replace(',', '.')),
      )
    })
    parsedForm.deployments[i] = deploy
  }
  return parsedForm
}

export const parseInvoiceOfferNumericInputs = (formData) => {
  // Convert all , into .
  const parsedForm = { ...formData }
  parsedForm.total_credit_limit = parsedForm.total_credit_limit
    .toString()
    .replace(',', '.')
  //
  for (let i = 0; i < parsedForm.amortization_plans.length; i++) {
    const plan = parsedForm.amortization_plans[i]
    plan.commission_rate = plan.commission_rate.toString().replace(',', '.')
    parsedForm.amortization_plans[i] = plan
  }
  return parsedForm
}

export const parsePaymentNumericInputs = (formData) => {
  const parsedForm = { ...formData }
  parsedForm.income = parsedForm.income.toString().replace(',', '.')
  parsedForm.revenue_share = parsedForm.revenue_share
    .toString()
    .replace(',', '.')
  parsedForm.quantity = parsedForm.quantity.toString().replace(',', '.')
  parsedForm.outstanding_balance = parsedForm.outstanding_balance
    .toString()
    .replace(',', '.')

  return parsedForm
}

export const parseOfferForm = (formData) => {
  // Convert strings to numbers, convert string to boolean, delete unnecessary fields
  const parsedForm = { ...formData }
  parsedForm.grace_days = parseInt(parsedForm.grace_days)
  for (let i = 0; i < parsedForm.deployments.length; i++) {
    const deploy = parsedForm.deployments[i]
    deploy.commission_rate = parseInt(
      (100 * parsedForm.deployments[i].commission_rate).toFixed(0),
    )
    deploy.revenue_share = parseInt(
      (100 * parsedForm.deployments[i].revenue_share).toFixed(0),
    )
    // if (i !== 0) {
    //   deploy.first_repayment_date = parsedForm.deployments[0].first_repayment_date
    //   deploy.monitoring_start_date = parsedForm.deployments[0].monitoring_start_date
    // }
    deploy.scenarios.forEach((scenario) => {
      scenario.raw_amount = parseInt((100 * scenario.raw_amount).toFixed(0))
      scenario.covenants_check_start_date =
        deploy.covenants_check_start_date ?? ''
      scenario.covenants_check_end_date = deploy.covenants_check_end_date ?? ''
      scenario.covenants.forEach(
        (covenant, i) =>
          (scenario.covenants[i].target_value = parseInt(
            (100 * covenant.target_value).toFixed(0),
          )),
      )
    })
    delete deploy.covenants_check_start_date
    delete deploy.covenants_check_end_date
    parsedForm.deployments[i] = deploy
  }

  return parsedForm
}

export const parseInvoiceOfferForm = (formData) => {
  // Convert strings to numbers, convert string to boolean, delete unnecessary fields
  const parsedForm = { ...formData }
  parsedForm.total_credit_limit = parseInt(
    (100 * parsedForm.total_credit_limit).toFixed(0),
  )
  for (let i = 0; i < parsedForm.amortization_plans.length; i++) {
    const plan = parsedForm.amortization_plans[i]
    plan.commission_rate = parseInt(
      (100 * parsedForm.amortization_plans[i].commission_rate).toFixed(0),
    )
    plan.period = parseInt(plan.period)
    parsedForm.amortization_plans[i] = plan
  }

  return parsedForm
}

export const parseForm = async (formData, formSchema) => {
  const parsedFormData = {}
  await formSchema.forEach(
    (field) =>
      (parsedFormData[field.id] = field.parseValue(formData[field.id])),
  )
  return parsedFormData
}
