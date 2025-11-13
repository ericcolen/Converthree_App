import * as React from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { enableScreens } from 'react-native-screens';
enableScreens();

// --- TELA PRIMÁRIA (CONVERSOR DE MOEDAS) ---
function TelaPrimaria() {
  const [valor, setValor] = React.useState('');
  const [resultado, setResultado] = React.useState(null);
  const [moedaOrigem, setMoedaOrigem] = React.useState('USD');
  const [moedaDestino, setMoedaDestino] = React.useState('BRL');
  const [moedas] = React.useState(['USD', 'BRL', 'EUR', 'GBP', 'JPY', 'BTC', 'ETH']);
  const [loading, setLoading] = React.useState(false);

  async function converter() {
    if (!valor) return;
    setLoading(true);
    setResultado(null);

    try {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${moedaOrigem}&tsyms=${moedaDestino}`
      );
      const data = await response.json();

      if (data[moedaDestino]) {
        const taxa = parseFloat(data[moedaDestino]);
        const resultadoConvertido = (parseFloat(valor) * taxa).toFixed(2);
        setResultado(resultadoConvertido);
      } else {
        setResultado('Conversão não disponível');
        console.log('Erro na resposta da API:', data);
      }
    } catch (error) {
      console.error('Erro ao converter:', error);
      setResultado('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient colors={['#0f0f10', '#1a1a1e']} style={styles.container}>
      <Text style={styles.title}>Conversor de Moedas</Text>

      <View style={styles.card}>
        <View style={styles.labelRow}>
          <Ionicons name="arrow-down-circle-outline" color="white" size={18} style={{ marginRight: 6 }} />
          <Text style={styles.label}>De:</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={moedaOrigem}
            onValueChange={(itemValue) => setMoedaOrigem(itemValue)}
            style={styles.picker}
          >
            {moedas.map((m) => (
              <Picker.Item key={m} label={m} value={m} color="white" />
            ))}
          </Picker>
        </View>

        <View style={styles.labelRow}>
          <Ionicons name="arrow-up-circle-outline" color="white" size={18} style={{ marginRight: 6 }} />
          <Text style={styles.label}>Para:</Text>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={moedaDestino}
            onValueChange={(itemValue) => setMoedaDestino(itemValue)}
            style={styles.picker}
          >
            {moedas.map((m) => (
              <Picker.Item key={m} label={m} value={m} color="white" />
            ))}
          </Picker>
        </View>

        <TextInput
          placeholder="Digite o valor"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={valor}
          onChangeText={(text) => {
            setValor(text);
            setResultado(null);
          }}
          style={[styles.input, { fontWeight: 'bold', color: 'white' }]}
        />

        <TouchableOpacity onPress={converter} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Converter</Text>
        </TouchableOpacity>

        {loading ? (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 15, fontSize: 18, fontWeight: 'bold' }}>
            Convertendo...
          </Text>
        ) : resultado && (
          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              {valor} {moedaOrigem} = {resultado} {moedaDestino}
            </Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

// --- OUTRAS TELAS ---
function TelaSecundaria() {
  return (
    <View style={realStyles.viewEx}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Tradutor em desenvolvimento...</Text>
    </View>
  );
}

function TelaTerciaria() {
  return (
    <View style={realStyles.viewEx}>
      <Text style={{ color: 'white', textAlign: 'center' }}>Consulta de CEP em desenvolvimento...</Text>
    </View>
  );
}

// --- NAVEGAÇÃO ---
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TP"
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a1e', borderBottomColor: 'white', borderBottomWidth: 0 },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#1a1a1e', borderTopWidth: 0 },
        }}
      >
        <Tab.Screen
          name="TP"
          component={TelaPrimaria}
          options={{
            title: 'Converthree',
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: { fontWeight: 'bold' },
            tabBarLabel: 'Moeda',
            tabBarIcon: ({ size }) => (
              <Ionicons name="logo-usd" color="white" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="TS"
          component={TelaSecundaria}
          options={{
            title: 'Tradutor',
            tabBarIcon: ({ size }) => (
              <Ionicons name="language-outline" color="white" size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="TT"
          component={TelaTerciaria}
          options={{
            title: 'CEP',
            tabBarIcon: ({ size }) => (
              <Ionicons name="location-outline" color="white" size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e1e24',
    padding: 20,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 0,
    borderColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 8,
  },
  picker: {
    backgroundColor: '#2c2c34',
    color: 'white',
    height: 45,
    fontSize: 18,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#2c2c34',
    borderRadius: 12,
    padding: 10,
    marginVertical: 12,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color:'#373737',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#2c2c34',
    borderRadius: 12,
    padding: 12,
    marginTop: 15,
  },
  resultText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const realStyles = StyleSheet.create
