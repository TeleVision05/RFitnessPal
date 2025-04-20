#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
#include <nlohmann/json.hpp>

using namespace std;
using json = nlohmann::json;

void printlist(const vector<string>& names, const vector<string>& units, const vector<float>& qty, const vector<float>& proteinAm, const vector<float>& calpu, const vector<float>& fatAm, const vector<float>& carbAm) {
    cout << "Here are all the options you can select:" << endl;
    for (unsigned int i = 0; i < names.size(); i++){
        cout << names.at(i) << " , " << calpu.at(i) << " calories per " << qty.at(i) << " " << units.at(i) << " per serving:" << endl;
        cout << proteinAm.at(i) << " grams of protein" << endl;
        cout << fatAm.at(i) << " grams of fat" << endl;
        cout << carbAm.at(i) << " grams of carbs" << endl;
        cout << "---------------------------------" << endl;
    }
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        cerr << "Usage: " << argv[0] << " <filename>" << endl;
        return 1;
    }

    ifstream inFS(argv[1]);
    if (!inFS) {
        throw runtime_error("Could not open the file!");
    }

    string jsonString((istreambuf_iterator<char>(inFS)), istreambuf_iterator<char>());
    inFS.close();
    json data = json::parse(jsonString);

    vector<string> scrpAllergen;
    vector<string> names;
    vector<string> units;
    vector<float> qty;
    vector<float> proteinAm;
    vector<float> calpu;
    vector<float> fatAm;
    vector<float> carbAm;
    vector<string> ingredientsscrp;
    vector<string> ingredientsinp;
    vector<string> Allergeninp;

    int timeofday = 0; // NOTE: You may want to adjust this to be user-input or based on some logic

    for (const auto& item : data.at(timeofday)["items"]) {
        names.push_back(item["name"]);
        scrpAllergen.push_back(item["allergens"].dump());
        calpu.push_back(item["calories"]);
        units.push_back(item["servingUnit"]);
        qty.push_back(item["servingSize"]);
        fatAm.push_back(item["fat"]);
        carbAm.push_back(item["carbohydrates"]);
        proteinAm.push_back(item["protein"]);
        ingredientsscrp.push_back(item["ingredients"]);
    }

    // removes ingredient preferences
    for (unsigned int i = 0 ; i < ingredientsinp.size(); i++) {
        string tempingredients = ingredientsinp.at(i);
        for (unsigned int j = 0; j < ingredientsscrp.size(); j++) {
            stringstream temp(ingredientsscrp.at(j));
            string eachword;
            while (getline(temp, eachword, ',')) {
                stringstream wordStream(eachword);
                string word;
                while (wordStream >> word) {
                    if (word == tempingredients) {
                        scrpAllergen.erase(scrpAllergen.begin() + j);
                        names.erase(names.begin() + j);
                        units.erase(units.begin() + j);
                        qty.erase(qty.begin() + j);
                        proteinAm.erase(proteinAm.begin() + j);
                        calpu.erase(calpu.begin() + j);
                        fatAm.erase(fatAm.begin() + j);
                        carbAm.erase(carbAm.begin() + j);
                        ingredientsscrp.erase(ingredientsscrp.begin() + j);
                        j--;
                        break;
                    }
                }
            }
        }
    }

    // for allergens
    for (unsigned int i = 0; i < Allergeninp.size(); i++) {
        string tempallergen = Allergeninp.at(i);
        for (unsigned int j = 0; j < scrpAllergen.size(); j++) {
            stringstream temp(scrpAllergen.at(j));
            string eachword;
            while (getline(temp, eachword, ',')) {
                stringstream wordStream(eachword);
                string word;
                while (wordStream >> word) {
                    if (word == tempallergen) {
                        scrpAllergen.erase(scrpAllergen.begin() + j);
                        names.erase(names.begin() + j);
                        units.erase(units.begin() + j);
                        qty.erase(qty.begin() + j);
                        proteinAm.erase(proteinAm.begin() + j);
                        calpu.erase(calpu.begin() + j);
                        fatAm.erase(fatAm.begin() + j);
                        carbAm.erase(carbAm.begin() + j);
                        ingredientsscrp.erase(ingredientsscrp.begin() + j);
                        j--;
                        break;
                    }
                }
            }
        }
    }

    printlist(names, units, qty, proteinAm, calpu, fatAm, carbAm);
    return 0;
}
