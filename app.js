window.addEventListener("load", solve);

function solve() {
  document.querySelector("form").addEventListener("submit", onSubmit);

  const carModelRef = document.getElementById("car-model");
  const carYearRef = document.getElementById("car-year");
  const partNameRef = document.getElementById("part-name");
  const partNumberRef = document.getElementById("part-number");
  const conditionRef = document.getElementById("condition");
  const infoListRef = document.querySelector(".info-list");
  const confirmRef = document.querySelector(".confirm-list");
  const nextBtnRef = document.getElementById("next-btn");
  

  function onSubmit(event) {
    event.preventDefault();

    const carModel = carModelRef.value;
    const carYear = carYearRef.value;
    const partName = partNameRef.value;
    const partNumber = partNumberRef.value;
    const condition = conditionRef.value;

    if (
      !carModel ||
      !carYear ||
      !partName ||
      !partNumber ||
      !condition ||
      !(carYear >= 1980 && carYear <= 2023)
    ) {
      return;
    }
    const li = createLi(carModel, carYear, partName, partNumber, condition);
    infoListRef.appendChild(li);
    clearInputField(
      carModelRef,
      carYearRef,
      partNumberRef,
      partNameRef,
      conditionRef
    );
    toggleNextBtn();
    document.getElementById("complete-img").style.visibility = "hidden";
    document.getElementById("complete-text").textContent = "";
  }
  function clearInputField(...field) {
    field.forEach((el) => (el.value = ""));
  }
  function toggleNextBtn() {
    nextBtnRef.disabled = !nextBtnRef.disabled;
  }
  function createLi(carModel, carYear, partName, partNumber, condition) {
    const li = document.createElement("li");
    li.classList.add("part-content");

    const article = createArticle(
      carModel,
      carYear,
      partName,
      partNumber,
      condition
    );

    const editBtn = createBtnAndAddListener("edit-btn", "Edit", onEdit);
    const continueBtn = createBtnAndAddListener(
      "continue-btn",
      "Continue",
      onContinue
    );

    li.appendChild(article);
    article.appendChild(editBtn);
    article.appendChild(continueBtn);

    return li;
  }
  function createBtnAndAddListener(classes, text, handler) {
    const btn = document.createElement("button");
    btn.classList.add(classes);
    btn.textContent = text;
    btn.addEventListener("click", handler);
    return btn;
  }
  function createArticle(carModel, carYear, partName, partNumber, condition) {
    const article = document.createElement("article");

    const pCarModel = document.createElement("p");
    pCarModel.textContent = "Car Model: " + carModel;

    const pCarYear = document.createElement("p");
    pCarYear.textContent = "Car Year: " + carYear;

    const pPartName = document.createElement("p");
    pPartName.textContent = "Part Name: " + partName;

    const pPartNumber = document.createElement("p");
    pPartNumber.textContent = "Part Number: " + partNumber;

    const pCondition = document.createElement("p");
    pCondition.textContent = "Condition: " + condition;

    article.appendChild(pCarModel);
    article.appendChild(pCarYear);
    article.appendChild(pPartName);
    article.appendChild(pPartNumber);
    article.appendChild(pCondition);

    return article;
  }
  function onEdit(e) {
    const li = e.currentTarget.parentElement;
    const pList = li.querySelectorAll("p");
    const [carModel, carYear, partName, partNumber, condition] = Array.from(
      pList
    ).map((x) => {
      const [staticText, value] = x.textContent.split(": ");
      return value;
    });
    carModelRef.value = carModel;
    carYearRef.value = carYear;
    partNameRef.value = partName;
    partNumberRef.value = partNumber;
    conditionRef.value = condition;
    toggleNextBtn();
    li.remove();
  }
  function onContinue(e) {
    const li = e.currentTarget.parentElement;

    Array.from(li.querySelectorAll("button")).forEach((button) =>
      button.remove()
    );

    const confirmBtn = createBtnAndAddListener(
      "confirm-btn",
      "Confirm",
      onConfirm
    );
    const cancelBtn = createBtnAndAddListener("cancel-btn", "Cancel", onCancel);

    li.appendChild(confirmBtn);
    li.appendChild(cancelBtn);

    confirmRef.appendChild(li);
  }
  function onConfirm(e) {
    e.currentTarget.parentElement.remove();
    toggleNextBtn();
    document.getElementById("complete-text").textContent = "Part is Ordered!";
    document.getElementById("complete-img").style.visibility = "visible";
  }
  function onCancel(e) {
    e.currentTarget.parentElement.remove();
    toggleNextBtn();
  }
}
