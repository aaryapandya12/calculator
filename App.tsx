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
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.navbarContent}>
            <Icon
              name="calculate"
              size={28}
              color="white"
              style={styles.navbarIcon}
            />
            <Text style={styles.navbarTitle}>Calculator App</Text>
          </View>
        </View>

        <View style={styles.calculatorContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={(text) => setInput(text)}
              style={styles.inputText}
              editable={true}
              onSelectionChange={({ nativeEvent: { selection } }) =>
                setCursorPosition(selection.start)
              }
            />
          </View>

          <View style={styles.resultContainer}>
            <TouchableOpacity
              style={styles.historyIcon}
              onPress={toggleHistory}
            >
              <Icon name="history" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.resultText}>{result}</Text>
          </View>

          {showHistory && (
            <View style={styles.historyContainer}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>History</Text>
                <TouchableOpacity onPress={clearHistory}>
                  <Text style={styles.clearHistory}>Clear</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.historyScrollView}>
                {history.map((entry, index) => (
                  <Text key={index} style={styles.historyText}>
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
                  button === "=" && styles.equalButton,
                  button === "AC" && styles.clearButton,
                ]}
                onPress={() => handleInputChange(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Calc by Aarya</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  navbar: {
    backgroundColor: "black",
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
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.2,
  },
  calculatorContainer: {
    flex: 1,
    backgroundColor: "black",
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
    backgroundColor: "#1E1E1E",
  },
  inputText: {
    fontSize: 30,
    color: "#FFFFFF",
    width: "100%",
  },
  resultContainer: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#1E1E1E",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  historyIcon: {
    padding: 10,
    marginRight: 10,
  },
  resultText: {
    fontSize: 32,
    color: "#FFFFFF",
    flex: 1,
    textAlign: "right",
    marginRight: 10,
  },
  historyContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    color: "#000",
    fontWeight: "bold",
  },
  clearHistory: {
    fontSize: 16,
    color: "#F44336",
  },
  historyText: {
    fontSize: 16,
    color: "#555",
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
    backgroundColor: "#3E3E3E",
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
    color: "#FFFFFF",
  },
  footer: {
    alignItems: "center",
    padding: 12,
    backgroundColor: "black",
  },
  footerText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default App;
