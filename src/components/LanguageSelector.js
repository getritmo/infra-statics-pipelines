import React, { useContext } from 'react'
import translate from '../i18n/translate'
import { Context } from '../components/I18nProvider'
import useWindowSize from 'hooks/useWindowSize'
import Select from 'react-select'
import { optionsLanguages } from '../data/data'
import {
  customStylesLanguageFooter,
  customStylesLanguageHeader,
} from '../data/styles'
import PropTypes from 'prop-types'

const LanguageSelector = ({ position }) => {
  const context = useContext(Context)
  const size = useWindowSize()

  const styles =
    position === 'header'
      ? customStylesLanguageHeader
      : customStylesLanguageFooter

  return (
    <div className={`language-selector__${position}`}>
      <Select
        onChange={context.selectLang}
        styles={styles}
        value={optionsLanguages.find((lang) => lang.value === context.locale)}
        label="Lang"
        menuPlacement={
          position === 'menu' && size.height > 940 ? 'bottom' : 'top'
        }
        placeholder={translate('common.select_language')}
        options={optionsLanguages}
        isSearchable={false}
      />
    </div>
  )
}

LanguageSelector.propTypes = {
  position: PropTypes.string.isRequired,
}

export default LanguageSelector
