const ProjectStatusBadge = ({ status }) => {
  const isOpen = status === 'Open'
  return <span className={isOpen ? 'pill pill-green' : 'pill pill-red'}>{isOpen ? '🟢' : '🔴'} {status}</span>
}

export default ProjectStatusBadge
