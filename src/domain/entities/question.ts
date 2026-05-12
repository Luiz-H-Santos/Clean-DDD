import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "../../core/entities/unique-entity-id"
import { Optional } from "../../core/types/optinal"

interface QuestionProps {

  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  title: string
  content: string
  createdAt: Date
  updateAt?: Date
  slug: Slug
}


export class Question extends Entity <QuestionProps> {
  static create(props: Optional<QuestionProps,'createdAt'>,
     id?: UniqueEntityId,
    ) {
    const question = new Question({
      ...props,
      createdAt: new Date(),
    }, id)

    return question
  }


}

  