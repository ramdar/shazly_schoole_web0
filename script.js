// Function to load materials based on the stage
async function loadMaterials(stage) {
  const materialsList = document.getElementById('materials');
  materialsList.innerHTML = ''; // Clear previous list

  try {
    // Fetch the appropriate data file based on the stage
    const data = await fetch(`data/${stage}/materials.json`); // تأكد من صحة هذا المسار
    const materials = await data.json();

    // Loop through the materials and create list items
    materials.forEach(material => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="lesson.html?material=${material.id}&stage=${stage}">${material.name}</a>`;
      materialsList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error loading materials:', error);
    materialsList.innerHTML = '<li>Error loading materials.</li>';
  }
}
// Function to load a lesson
async function loadLesson(materialName, lessonName) {
  const lessonSections = document.getElementById('lesson-sections');
  lessonSections.innerHTML = '';

  try {
    // Load lesson data from JSON (you may need to adjust the path)
    const data = await fetch(`data/${materialName}/${lessonName}.json`);
    const lessonData = await data.json();

    // Loop through lesson sections and create cards
    lessonData.sections.forEach(section => {
      const card = document.createElement('div');
      card.classList.add('lesson-card');
      card.innerHTML = `
          <h3>${section.title}</h3>
          <p>${section.content}</p>
        `;
      lessonSections.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading lesson:', error);
    lessonSections.innerHTML = '<p>Error loading lesson content.</p>';
  }
}

// Function to load review questions
async function loadReviewQuestions(materialName, lessonName) {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = ''; // Clear previous questions

  try {
    // Load review questions from JSON
    const data = await fetch(`data/${materialName}/${lessonName}_review.json`);
    const questions = await data.json();

    // Loop through questions and display them based on type
    questions.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('question');

      switch (question.type) {
        case 'multiple_choice':
          questionDiv.innerHTML = `
              <p>${question.text}</p>
              <ul>
                ${question.options.map(option => `<li><label><input type="radio" name="question_${question.id}" value="${option}">${option}</label></li>`).join('')}
              </ul>
            `;
          break;
        case 'fill_in_the_blanks':
          questionDiv.innerHTML = `<p>${question.text}</p><input type="text" name="question_${question.id}">`;
          break;
        case 'true_false':
          questionDiv.innerHTML = `
              <p>${question.text}</p>
              <label><input type="radio" name="question_${question.id}" value="true">صح</label>
              <label><input type="radio" name="question_${question.id}" value="false">خطأ</label>
            `;
          break;
        case 'match':
          questionDiv.innerHTML = `
              <p>${question.text}</p>
              <div class="match-container">
                <div class="match-col">
                  ${question.left.map(item => `<p>${item}</p>`).join('')}
                </div>
                <div class="match-col">
                  ${question.right.map(item => `<select name="question_${question.id}"><option value="">اختر...</option>${question.right.map(opt => `<option value="${opt}">${opt}</option>`).join('')}</select>`).join('')}
                </div>
              </div>
            `;
          break;
      }
      questionContainer.appendChild(questionDiv);
    });
  } catch (error) {
    console.error('Error loading review questions:', error);
    questionContainer.innerHTML = '<p>Error loading review questions.</p>';
  }
}