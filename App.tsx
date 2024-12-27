import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const dynamicStyles = isDarkTheme ? darkStyles : lightStyles;

  const handleInputChange = (button: string) => {
    if (button === "AC") {
      setInput("");
      setResult("");
    } else if (button === "CE") {
      if (input.length > 0) {
        const newInput =
          input.substring(0, cursorPosition - 1) +
          input.substring(cursorPosition);
        setInput(newInput);
        setCursorPosition(cursorPosition - 1);
      }
    } else if (button === "=") {
      try {
        const finalResult = eval(
          input
            .replace(/√/g, "Math.sqrt")
            .replace(/π/g, "Math.PI")
            .replace(/\^/g, "**")
        ).toString();
        setInput(finalResult);
        setResult("");
        setHistory([...history, `${input} = ${finalResult}`]);
      } catch (e) {
        setResult("Error");
      }
    } else if (button === "√") {
      const newInput = `Math.sqrt(${input})`;
      setInput(newInput);
      try {
        const liveResult = eval(newInput).toString();
        setResult(liveResult);
      } catch (e) {
        setResult("");
      }
    } else if (button === "π") {
      setInput(input + "π");
      try {
        const liveResult = eval(input + "π").toString();
        setResult(liveResult);
      } catch (e) {
        setResult("");
      }
    } else if (button === "()") {
      let newInput;
      const openCount = (input.match(/\(/g) || []).length;
      const closeCount = (input.match(/\)/g) || []).length;

      if (openCount > closeCount) {
        newInput = input + ")";
      } else {
        newInput = input + "(";
      }
      setInput(newInput);
      setCursorPosition(cursorPosition + 1);

      try {
        const liveResult = eval(newInput).toString();
        setResult(liveResult);
      } catch (e) {
        setResult("");
      }
    } else if (button === "xʸ") {
      setInput(input + "^");
      try {
        const liveResult = eval(input.replace(/\^/g, "**")).toString();
        setResult(liveResult);
      } catch (e) {
        setResult("");
      }
    } else if (button === "+/-") {
      if (input) {
        if (input[0] === "-") {
          setInput(input.substring(1));
        } else {
          setInput("-" + input);
        }
      }
      try {
        const liveResult = eval(input).toString();
        setResult(liveResult);
      } catch (e) {
        setResult("");
      }
    } else {
      const newInput =
        input.substring(0, cursorPosition) +
        button +
        input.substring(cursorPosition);
      setInput(newInput);
      setCursorPosition(cursorPosition + 1);

      try {
        const liveResult = eval(newInput.replace(/\^/g, "**")).toString();
        setResult(liveResult);
      } catch (e) {
        setResult("");
      }
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.container, dynamicStyles.container]}>
        <View style={[styles.navbar, dynamicStyles.navbar]}>
          <View style={styles.navbarContent}>
            <Icon
              name="calculate"
              size={28}
              color={isDarkTheme ? "white" : "black"}
              style={styles.navbarIcon}
            />
            <Text style={[styles.navbarTitle, dynamicStyles.navbarTitle]}>
              Avegen Calculator App
            </Text>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              <Icon
                name={isDarkTheme ? "wb-sunny" : "brightness-3"}
                size={24}
                color={isDarkTheme ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.calculatorContainer, dynamicStyles.calculatorContainer]}>
          <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={[styles.inputText, dynamicStyles.inputText]}
              editable={true}
              onSelectionChange={({ nativeEvent: { selection } }) =>
                setCursorPosition(selection.start)
              }
            />
          </View>

          <View style={[styles.resultContainer, dynamicStyles.resultContainer]}>
            <TouchableOpacity
              style={styles.historyIcon}
              onPress={toggleHistory}
            >
              <Icon
                name="history"
                size={30}
                color={isDarkTheme ? "#fff" : "#000"}
              />
            </TouchableOpacity>
            <Text style={[styles.resultText, dynamicStyles.resultText]}>
              {result}
            </Text>
          </View>

          {showHistory && (
            <View style={[styles.historyContainer, dynamicStyles.historyContainer]}>
              <View style={styles.historyHeader}>
                <Text style={[styles.historyTitle, dynamicStyles.historyTitle]}>
                  History
                </Text>
                <TouchableOpacity onPress={clearHistory}>
                  <Text style={styles.clearHistory}>Clear</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.historyScrollView}>
                {history.map((entry, index) => (
                  <Text
                    key={index}
                    style={[styles.historyText, dynamicStyles.historyText]}
                  >
                    {entry}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.buttonsContainer}>
            {[
              "AC",
              "√",
              "()",
              "CE",
              "1",
              "2",
              "3",
              "%",
              "4",
              "5",
              "6",
              "-",
              "7",
              "8",
              "9",
              "*",
              "π",
              "0",
              "/",
              "+",
              "+/-",
              "xʸ",
              ".",
              "=",
            ].map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  dynamicStyles.button,
                  button === "=" && styles.equalButton,
                  button === "AC" && styles.clearButton,
                ]}
                onPress={() => handleInputChange(button)}
              >
                <Text style={[styles.buttonText, dynamicStyles.buttonText]}>
                  {button}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.footer, dynamicStyles.footer]}>
            <Text style={[styles.footerText, dynamicStyles.footerText]}>
              Calc by Aarya
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
  },
  navbarContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  navbarIcon: {
    marginRight: 10,
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  themeToggle: {
    marginLeft: 10,
  },
  calculatorContainer: {
    flex: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  inputContainer: {
    minHeight: 60,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 15,
  },
  inputText: {
    fontSize: 30,
    width: "100%",
  },
  resultContainer: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  historyIcon: {
    padding: 10,
    marginRight: 10,
  },
  resultText: {
    fontSize: 32,
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  historyContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 10,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  clearHistory: {
    fontSize: 16,
    color: "#F44336",
  },
  historyText: {
    fontSize: 16,
  },
  historyScrollView: {
    maxHeight: 100,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  button: {
    width: "22%",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  clearButton: {
    backgroundColor: "#FF5722",
  },
  equalButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 24,
  },
  footer: {
    alignItems: "center",
    padding: 12,
  },
  footerText: {
    fontSize: 18,
    fontWeight: "600",
  },
});


const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  navbar: {
    backgroundColor: "#000",
  },
  navbarTitle: {
    color: "#fff",
  },
  calculatorContainer: {
    backgroundColor: "#000",
  },
  inputContainer: {
    backgroundColor: "#1E1E1E",
  },
  inputText: {
    color: "#fff",
  },
  resultContainer: {
    backgroundColor: "#1E1E1E",
    borderBottomColor: "#444",
  },
  resultText: {
    color: "#fff",
  },
  historyContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  historyTitle: {
    color: "#000",
  },
  historyText: {
    color: "#555",
  },
  button: {
    backgroundColor: "#3E3E3E",
  },
  buttonText: {
    color: "#fff",
  },
  footer: {
    backgroundColor: "#000",
  },
  footerText: {
    color: "#fff",
  },
});


const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  navbar: {
    backgroundColor: "#F5F5F5",
  },
  navbarTitle: {
    color: "#000",
  },
  calculatorContainer: {
    backgroundColor: "#F5F5F5",
  },
  inputContainer: {
    backgroundColor: "#FFF",
  },
  inputText: {
    color: "#000",
  },
  resultContainer: {
    backgroundColor: "#FFF",
    borderBottomColor: "#DDD",
  },
  resultText: {
    color: "#000",
  },
  historyContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  historyTitle: {
    color: "#FFF",
  },
  historyText: {
    color: "#FFF",
  },
  button: {
    backgroundColor: "#DDD",
  },
  buttonText: {
    color: "#000",
  },
  footer: {
    backgroundColor: "#F5F5F5",
  },
  footerText: {
    color: "#000",
  },
});

export default App;
