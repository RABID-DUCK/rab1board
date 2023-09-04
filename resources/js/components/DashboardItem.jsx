import { Link } from "react-router-dom";

const DashboardItem = ({project}) => {
    
    return (
        <Link to={`/dashboard/${project.id}`}><h1>Проект {project.title}</h1></Link>
    )
}

export default DashboardItem;