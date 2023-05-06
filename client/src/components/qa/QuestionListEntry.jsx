import React from 'react';

// eslint-disable-next-line react/prop-types
export default function QuestionListEntry({ question }) {
  return (
    <>
      <div>
        Q:
        {' '}
        {question.question_body}
      </div>
      <div>
        by
        {' '}
        {question.asker_name}
      </div>
      <div>
        {' '}
        {question.question_date}
      </div>
      <div>
        Helpful?
        {' '}
        <button type="button">
          Yes
          {' '}
          {question.question_helpfulness}
        </button>
      </div>
      <button type="button">
        Report
      </button>
    </>
  );
}
