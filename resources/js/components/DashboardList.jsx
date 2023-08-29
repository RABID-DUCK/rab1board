import DashboardItem from "./DashboardItem"

const DashboardList = ({desk}) => {
    return (
        <>
            {desk.map((project) => (
                <DashboardItem key={project.id} project={project}/>
            ))}
        </>
    )
}

export default DashboardList