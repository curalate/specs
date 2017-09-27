
import React, { Component } from 'react';
import classname from 'classname';
import moment from 'moment';
import { Link } from 'react-router';
import ServiceStats from '../service-stats';
import styles from './index.css';

export default class TasksList extends Component {
    static propTypes = {
        cluster: React.PropTypes.object.isRequired,
    };

    static contextTypes = {
        awsConfig: React.PropTypes.object.isRequired,
    };

    render() {
        const tasks = this.props.tasks;
        return (
            <ul className={styles.TasksList}>
                {tasks.map(::this.renderTask)}
            </ul>
        );
    }

    renderTask(task, n) {
        const { region } = this.context.awsConfig;
        const { clusterName } = this.props.cluster;
        const renderContext = this.props.context;

        const taskArnId = task.taskArn.split(':task/')[1];
        const containerInstanceId = task.containerInstanceArn.split(':container-instance/')[1];
        const serviceName = (task.group && task.group.startsWith('service:')) ? task.group.replace('service:', '') : null;

        const taskUrl = `https://${region}.console.aws.amazon.com/ecs/home?region=${region}#/clusters/${clusterName}/tasks/${taskArnId}/details`;
        const containerInstanceUrl = `/${clusterName}/container-instance/${containerInstanceId}`;
        const serviceUrl = `/${clusterName}/${serviceName}`;

        // for (let n=0; n<task.containers[0].networkBindings.length; n++) {
        //     if (task.containers[0].networkBindings[n].containerPort === 8081) {
        //         var hostPort = task.containers[0].networkBindings[n].hostPort;
        //     }
        // }

        // const binding = task.containers[0].networkBindings.find((binding) => {
        //     return binding.containerPort === 8081;
        // });

        // const hostPort = binding.hostPort;

        const containerIp = task.containerInstanceIp;
        // const adminUrl = `http://${containerIp}:${hostPort}`;

        // const adminUrl =
        //
        //     {task.containers[0].networkBindings.map(({ protocol, hostPort, containerPort }, index) => (
        //         <tr key={`mapping_${index}`}>
        //             <th>port mappings</th>
        //             <td><a href={adminUrl} target="_blank">{protocol} : {hostPort} (host) - {containerPort} (container)</a></td>
        //         </tr>
        //     ))}

        return (
            <li key={task.taskArn}>
                <h3>
                    {task.containers.map(container => (
                        <div key={container.containerArn}>
                            {container.name}
                        </div>
                    ))}
                </h3>
                <table>
                    <tbody>
                    {serviceName &&
                    <tr>
                        <th>Service</th>
                        <td><Link to={serviceUrl}>{serviceName}</Link></td>
                    </tr>
                    }
                    <tr>
                        <th>Container Instance</th>
                        <td><Link to={containerInstanceUrl}>{containerInstanceId}</Link></td>
                    </tr>
                    <tr>
                        <th>Task ID</th>
                        <td><a href={taskUrl} target="_blank">{taskArnId}</a></td>
                    </tr>
                    {task.containers[0].networkBindings.map(({ protocol, hostPort, containerPort }, index) => (
                        <tr key={`binding_${index}`}>
                            <th>Port Mappings</th>
                            <td><a href={`http://${containerIp}:${hostPort}`} target="_blank">{protocol} : {hostPort} (host) - {containerPort} (container)</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </li>
        )
    }
};