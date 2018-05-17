const addCourseBtn = document.querySelector('.add-course__btn');
const addCourseModal = document.querySelector('.add-course-modal');
const modalOverlay = document.querySelector('.overlay');

const closeAddCourseModal = document.querySelector('.close-modal');
const addCourseToList = document.querySelector('.add-course-to-list');

const availableCourses = document.querySelector('.course-selection__list');

const courseTable = document.querySelector('.course-table__tbody');

const dismissNotification = document.querySelector('.delete');
const message = document.querySelector('.message');

let numberOfNewCoursesSelected = 0;

const selectedCourses = [];

const courses = [
  {
    name: 'Java 101',
    professor: 'Brown',
    time: 'MWF 9:00 - 12:00',
    selected: true,
    id: 0
  },
  {
    name: 'UX Design',
    professor: 'Reid',
    time: 'TR 14:00 - 15:30',
    selected: true,
    id: 1
  },
  {
    name: 'Accounting',
    professor: 'Miller',
    time: 'MWF 16:00 - 19:00',
    selected: true,
    id: 2
  },
  {
    name: 'Binary 100',
    professor: 'Stewart',
    time: 'T 12:00 - 6:00',
    selected: false,
    id: 3
  },
  {
    name: 'Binary 101',
    professor: 'Sims',
    time: 'MWF 9:00 - 10:00',
    selected: false,
    id: 4
  },
  {
    name: 'Programming in COBOL',
    professor: 'Smith',
    time: 'TWF 16:00 - 17:30',
    selected: false,
    id: 5
  },
  {
    name: 'Intro to AI',
    professor: 'Andrews',
    time: 'TR 20:00 - 22:00',
    selected: false,
    id: 6
  }
];

dismissNotification.addEventListener('click', () => {
  message.classList.add('message--invisible');
  this.setTimeout(() => {
    message.classList.add('message--hidden');
  }, 3000);
});

addCourseBtn.addEventListener('click', () => {
  // Show modal
  this._toggleAddClassModal(false);
});

closeAddCourseModal.addEventListener('click', () => {
  // Hide modal
  this._toggleAddClassModal(true);
});

addCourseToList.addEventListener('click', () => {
  // Add course to list
  addSelectedCoursesToList();
  // Hide modal
  this._toggleAddClassModal(true);
  // Add course to list
});

populateYourCoursesTable();


function populateYourCoursesTable() {
  courseTable.innerHTML = null;
  availableCourses.innerHTML = null;
  const selectedCourses = [];
  const availableCourseList = [];
  courses.forEach((course, i) => {
    if(course.selected) {
      selectedCourses.push(_createNewRow(course));
    } else {
      availableCourseList.push(_createNewAvailableCourse(course));
    }
  });

  selectedCourses.forEach(item => {
    courseTable.appendChild(item);
  });

  availableCourseList.forEach(item => {
    item.addEventListener('click', (e) => {
      
      if(e.target.tagName === 'INPUT') {
        const id = e.target.parentNode.id;
        const isChecked = e.target.checked || 0;
        _checkNumberOfSelectedCourses(id, isChecked);
      }
    });
    availableCourses.appendChild(item);
  });
}

function addSelectedCoursesToList() {
  // Grab children node that are checked
  for(let item of availableCourses.children) { 
    const courseCheckbox = item.children[0];
    const selectedCourseId = item.id;
    if(courseCheckbox.checked) {
      // Update the courses array selected values and rerender
      courses[selectedCourseId].selected = true;
    }
  }
  populateYourCoursesTable();
}

function _createNewAvailableCourse(course) {
  const courseLabel = document.createElement('label');
  courseLabel.classList.add('checkbox');
  const courseCheckbox = document.createElement('input');
  courseCheckbox.setAttribute('type', 'checkbox');
  courseLabel.appendChild(courseCheckbox);
  courseLabel.appendChild(document.createTextNode(course.name));
  courseLabel.setAttribute('id', course.id);
  return courseLabel;
}

function _checkNumberOfSelectedCourses(id, isChecked) {
  isChecked ? numberOfNewCoursesSelected++ : numberOfNewCoursesSelected--;
  if(numberOfNewCoursesSelected <= 0) {
    addCourseToList.setAttribute('disabled', true);
  } else {
    addCourseToList.removeAttribute('disabled');
  }
}

function _createNewRow(course) {
  const courseRow = document.createElement('tr');
  const courseName = document.createElement('td');
  courseName.appendChild(document.createTextNode(course.name));

  const courseProfessor =document.createElement('td');
  courseProfessor.appendChild(document.createTextNode(course.professor));

  const courseTime=document.createElement('td');
  courseTime.appendChild(document.createTextNode(course.time));

  courseRow.appendChild(courseName);
  courseRow.appendChild(courseProfessor);
  courseRow.appendChild(courseTime);

  return courseRow;
}

function _toggleAddClassModal(hide) {
  if(hide) {
    addCourseModal.classList.remove('add-course-modal--visible');
    modalOverlay.classList.remove('overlay--visible');
  } else {
    addCourseModal.classList.add('add-course-modal--visible');
    modalOverlay.classList.add('overlay--visible');
  }
}