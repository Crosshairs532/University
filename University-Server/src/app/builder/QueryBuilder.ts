import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }
  public search(searchableFields: string[]) {
    let searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      const searchQuery = searchableFields.map(
        (item) =>
          ({
            [item]: { $regex: searchTerm, $options: "i" },
          } as FilterQuery<T>)
      );

      this.modelQuery = this.modelQuery.find({
        $or: searchQuery,
      });
    }

    return this;
  }

  public filter(excludedFields?: string[]) {
    let queryObj = { ...this?.query };
    excludedFields?.forEach((field: string) => {
      return delete queryObj[field];
    });
    this.modelQuery = this.modelQuery.find(queryObj);

    return this;
  }

  public sort() {
    const sortFields =
      this.query.sort && (this?.query?.sort as string).split(",").join(" ");
    console.log(sortFields);
    let sort = sortFields ? sortFields : "-createdAt";

    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  public paginate() {
    // const skip = Number(this?.query?.skip) || 0;
    const page = Number(this?.query?.page) || 1;
    const limit = 10;
    const skip_ = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip_).limit(limit);

    return this;
  }

  public fields() {
    const fieldsValues =
      this?.query?.fields &&
      (this?.query?.fields as string).split(",").join(" ");

    let fields = fieldsValues ? fieldsValues : "-__v";

    this.modelQuery = this.modelQuery.select(fields as string);
    return this;
  }
}

export default QueryBuilder;
