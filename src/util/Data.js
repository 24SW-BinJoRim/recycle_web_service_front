import { data_convenience, data_restaurant, data_cafe } from "util/TestData";

export const loadData = () => {
    var data = data_convenience;
    data = data.concat(data_restaurant);
    data = data.concat(data_cafe);

    return data;
} 