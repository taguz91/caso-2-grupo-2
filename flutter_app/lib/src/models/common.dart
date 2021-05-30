class ErrorMessage {
  late String message;
  static const String DEFAULT_MESSAGE = 'Vuelve a intentarlo en unos minutos';

  ErrorMessage({required this.message});

  ErrorMessage.fromJson(Map<String, dynamic> json) {
    message = json['message'] ?? DEFAULT_MESSAGE;
  }
}
