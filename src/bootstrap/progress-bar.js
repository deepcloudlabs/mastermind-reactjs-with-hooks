export function ProgressBar(props) {
    const valueMax = props.valueMax;
    const percent = Math.floor((100 * props.value) / valueMax);
    const progressStyle = { width : percent+"%"};
    let progressBarClass = "progress-bar progress-bar-striped bg-success";
    if (percent <= 30)
       progressBarClass = "progress-bar progress-bar-striped bg-danger";
    else if (percent <= 50)
        progressBarClass = "progress-bar progress-bar-striped bg-warning";
    else if (percent <= 80)
        progressBarClass = "progress-bar progress-bar-striped bg-info";

    return (
        <div className="form-group">
            <label>{props.label}</label>
            <div className="progress">
                <div className={progressBarClass} style={progressStyle}></div>
            </div>
        </div>
    );
}