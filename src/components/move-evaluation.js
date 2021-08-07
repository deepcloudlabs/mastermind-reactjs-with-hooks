import {Fragment} from "react";

export function MoveEvaluation(props){
    let perfectSpan = "";
    let partialSpan = "";
    let noMatchSpan = "";
    if (props.partial > 0){
        partialSpan = <span className="badge bg-danger">{props.partial}</span>
    }
    if (props.perfect > 0){
        perfectSpan = <span className="badge bg-success">{props.perfect}</span>
    }
    if (props.perfect === 0 && props.partial === 0){
        noMatchSpan = <span className="badge bg-info">NO Match!</span>
    }
    return (
      <Fragment>
          {partialSpan} {perfectSpan} {noMatchSpan}
      </Fragment>
    );
}