FORMAT FOR JSON CASE FILES:

- **Name**: Required String Field, Name of Case
- **Time Limit**: Required Integer Field, Time of Case (Minutes)
- **Sections**: Required Array field, all the sections for the case

  
//From this point, each case is designed to be modular
//each section is defined by a section title, section type, section time limit, and variable fields defined by the type of section

- **Name**: Required String field, Name of section
- **Time**: Required Integer field, number of minutes
- **Type**: Required String field, brainstorm, framework, Writing
(brainstorm is question boxes, framwork is table, writing is text box)
- **Information**: Required array field, all images/prompts/questions provided to user
    - **img**: non-required field, image providied
         - height: non-required field, height of image
         - width: non-required field, width of image
    - **prompt**: non-required text field, prompt provided
    - **hint**: non-required text field, guiding questions, or provided formulas, placed below prompt if provided
- **Answer**: Required String Field, Example answer of question format





