export function getActiveDeploys(offers) {
  const ids =
    offers &&
    offers.length &&
    offers.reduce((acc, current) => {
      if (current.type !== 'invoice_financing') {
        const currency = current.currency
        const deploysIds = current.deployments
          .filter((deploy) => deploy.status === 'deployed')
          .map((deploy) => ({
            value: deploy.id,
            label: deploy.deploy_number || deploy.id,
            currency,
            ...deploy,
            offerId: current.id,
          }))
        if (deploysIds.length) acc.push(...deploysIds)
      }
      return acc
    }, [])
  return ids
}
