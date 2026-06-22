import clsx from 'clsx'

const Button = ({
  children, variant = 'primary', size = 'md',
  block = false, loading = false, disabled = false,
  onClick, type = 'button', className = '', style = {}, ...rest
}) => (
  <button
    type={type}
    className={clsx('btn', `btn-${variant}`, size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', block && 'btn-block', className)}
    style={style}
    onClick={onClick}
    disabled={disabled || loading}
    {...rest}
  >
    {loading && (
      <span style={{
        width: 14, height: 14,
        border: '2px solid rgba(255,255,255,0.4)',
        borderTopColor: '#fff', borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 0.7s linear infinite',
      }} />
    )}
    {children}
  </button>
)

export default Button