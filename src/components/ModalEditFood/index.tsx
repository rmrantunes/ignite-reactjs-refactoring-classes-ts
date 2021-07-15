import { Component, createRef } from "react";
import { FiCheckSquare } from "react-icons/fi";
import { FormHandles } from "@unform/core";

import { Form } from "./styles";
import Modal from "../Modal";
import Input from "../Input";
import { FoodType } from "../Food";

type ModalEditFoodProps = {
  isOpen: boolean;
  setIsOpen(): void;
  handleUpdateFood(food: FoodType): void;
  editingFood: FoodType;
};

class ModalEditFood extends Component<ModalEditFoodProps> {
  private formRef = createRef<FormHandles>();

  handleSubmit = async (data: FoodType) => {
    const { setIsOpen, handleUpdateFood } = this.props;

    handleUpdateFood(data);
    setIsOpen();
  };

  render() {
    const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          ref={this.formRef}
          onSubmit={this.handleSubmit}
          initialData={editingFood}
        >
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
}

export default ModalEditFood;
