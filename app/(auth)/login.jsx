import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { UserService } from '../../services/api/UserService';

const Login = () => {
  const userService = new UserService();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  const handleLogin = async () => {
    const loginRequest = {
      "email": email,
      "senha": senha
    }
    if (email.trim() === '' || senha.trim() === '') {
      setError('Campo(s) obrigatório(s)');
    } else {
      setError(null);
    }
    try
    {
      const loginResponse = await userService.login(loginRequest);;
        if(loginResponse) {
          const usuario = loginResponse.usuario
          Alert.alert('Login feito com sucesso', `Bem vindo de volta, ${usuario.nome}`)
            
          if(usuario.tipo === 'ROLE_CLIENTE'){
              router.push('/home');
            }
          } else {
            Alert.alert('Erro de login', 'Email ou senha incorretos');
          }          
        }
        catch (error) {
          Alert.alert('Erro', 'Não foi possível se conectar ao servidor');
        }
    }
    return (
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Login</Text>
          <Image
            source={{ uri: '../../assets/Barber-Connect.png' }}
            style={styles.logo}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Digite seu email" onChangeText={setEmail} value={email} required />
  
          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} placeholder="Digite sua senha" secureTextEntry onChangeText={setSenha} value={senha} />
  
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotText}>Esqueci Senha</Text>
          </TouchableOpacity>
          {erro && <Text style={{ color: 'red' }}>{erro}</Text>}
          <TouchableOpacity style={styles.loginButton} onPress={() => handleLogin()}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
  safeArea: {
      flex: 1,
      backgroundColor: '#fff', 
  },
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  loginBox: {
      backgroundColor: '#fff',
      width: '85%',
      borderRadius: 20,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
      elevation: 10,
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#000',
  },
  logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
  },
  label: {
      alignSelf: 'flex-start',
      fontSize: 16,
      marginBottom: 5,
      marginLeft: 10,
      color: '#000',
  },
  input: {
      width: '100%',
      height: 40,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingLeft: 15,
      marginBottom: 20,
  },
  forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 20,
  },
  forgotText: {
      color: '#777',
  },
  loginButton: {
      backgroundColor: '#0099e6',
      width: '100%',
      padding: 10,
      borderRadius: 25,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
      elevation: 5,
  },
  loginButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
});

export default Login