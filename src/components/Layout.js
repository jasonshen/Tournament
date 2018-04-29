import React from 'react'

export default ({ children, weight }) => (
  <div className={`fn fl-ns w-${weight}-ns pr4-ns`}>
    {children}
  </div>
)
